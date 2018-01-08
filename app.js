var https = require('https');
const fs = require('fs');
var cfg = require('./config');
var moment = require('moment');
var json2csv = require('json2csv');
var dotenv = require('dotenv');
var prompt = require('prompt');
var parse = require('csv-parse');

var promptChoiceSchema = {
    properties: { 
        choicename: {
            description: 'Enter choice',
            type: 'string',
            required: true 
        }
    }
}

var promptKeySchema = {
    properties: { 
        keyname: {
            description: 'Enter Key for table',
            required: true 
        }
    }
}

var promptFileNameSchema = {
    properties: { 
        filename: {
            description: 'Enter CSV filename',
            type: 'string',
            required: true 
        },
        tablename: {
            description: 'Enter table name for source data',
            type: 'string',
            required: true
        }
    }
}

dotenv.load();
console.log("SNOWREST2CSV v0.1 operational...");

var csvFileName = "output.csv";
var cmdKey = process.argv.slice(2)[0]; 
if (!cmdKey) {

    console.log("Enter choice on how to create output:");
    console.log("1: by filename - provide filename of CSV file with column headers");
    console.log("2: by key - provide special key that configuration knows for table and columns");

    prompt.message = "";
    prompt.start();

    prompt.get(promptChoiceSchema, function(err, result) {
        if (result.choicename == "2") {
            prompt.get(promptKeySchema, function(err, result) {
                console.log("processing for key:" + result.keyname + "...");
                doKeyRequest(result.keyname);
            });            
        } else {
            console.log("Provide CSV file with following format");
            console.log("First Row: column headers to display on output file");
            console.log("Second Row: columns to request from REST API");
            console.log("Third row (optional): queryparam string in ServiceNow format (i.e.:u_work_unit%3DDigital%20Insight%5Eu_account_type%3Dcustomer)");
            prompt.get(promptFileNameSchema, function(err, result) {
                doFileRequest(result.filename);
                console.log("processing file:" + result.filename + "...");
            });
        }
    })
    

} else {    
    //TODO: parse cmdKey, 
    // if endswith .csv, then its not a key but csv file
    // read that csv file, use the part before file extension as table_name
    // so customer_account.csv would:
    //      read that file, capture every column name into array of columns
    //      create select on 'customer_account' table
    //      dump results to 'customer_account_output.csv' file
    // print out where the results are.
    if (cmdKey.endsWith('.csv')) {
        doFileRequest(cmdKey);
    } else {
        doKeyRequest(cmdKey);    
    }
}

function doKeyRequest(withKey) {
    var restCalls = cfg.calls;
    var restCallOptions = restCalls.filter(function(item) {
        return item.key == withKey;
    });
    if (restCallOptions.length > 0) {
        doRequest(restCallOptions[0]);
    } else {
        console.log("Unable to find any REST calls for " + withKey);
    }
}

// -- 
function doFileRequest(withFileName) {
    
    var fileNameParts = withFileName.split('.');
    var table_name = fileNameParts[0];

    var restCallOptions = {
        key: table_name,
        table: table_name,
        //query: "u_work_unit%3DDigital%20Insight%5Eu_account_type%3Dcustomer",
        //fields: ["u_customer_type", "u_tax_id", "u_fdic_number", "u_potential_end_users", "u_tier", "u_master_customer_number", "name", "u_active", "u_short_name", "u_fi_type", "u_ncua_id", "u_routing_transit_number", "u_di_number"],
        headerFields: "",
        restFields: "",
        limit: 200
    };

    // // todo: parse the CSV file
    fs.readFile(withFileName, function(err, fileData) {
        parse(fileData, {trim: true, to: 3}, function(err, rows) {
            restCallOptions.headerFields = '"' + rows[0].join(',') + '"';
            restCallOptions.restFields =  '"' + rows[1].join(',') + '"';
            if (rows.length > 2) {
                restCallOptions.query = rows[2][0];
            }

            doRequest(restCallOptions);
        });
    });
    
    
}

function doRequest(restCallOptions) {
    
    // build field array from options
    var headerFields = restCallOptions.headerFields.split(',');
    var snFields = restCallOptions.restFields.split(',');

    if (headerFields.length !== snFields.length) {
        console.log("List of Header fields does not match list of fields");
        console.log('dbg - headerfieldcount=' + headerFields.length);
        console.log('dbg - detailfieldcount=' + snFields.length);
        return;
    }
    
    // build query string param path
    var restPath = "/api/now/table/" + restCallOptions.table + '?';
    if (restCallOptions.query) {
        restPath += "sysparm_query=" + restCallOptions.query + '&';
    }
    restPath += "sysparm_fields=" + snFields.join("%2C");
    if (restCallOptions.limit) {
        restPath += "&sysparm_limit=" + restCallOptions.limit;
    }
    
    restPath += "&sysparm_exclude_reference_link=TRUE";
    //restPath += "&sysparm_display_value=true";    // if true, provides friendly name for ALL ref values (FKs and simple IDs)

    //console.log('rest option query:' + restCallOptions.query);
    //console.log('rest uri:' + restPath);
    //console.log(`credentials: [user:${process.env.RESTAPI_USER}, pass:${process.env.RESTAPI_PASS}]`);

    // build options
    var options = {
        host: cfg.options.resthost,
        port: 443,
        path: restPath,
        // authentication headers
        headers: {
                       //'Authorization': 'Basic ' + new Buffer(cfg.options.soapusername + ':' + cfg.options.soappassword).toString('base64')
           'Authorization': 'Basic ' + new Buffer(process.env.RESTAPI_USER + ':' + process.env.RESTAPI_PASS).toString('base64')
        }   
     };
    
     https.get(options, (resp) => {
        let rawData = '';

        resp.on('data', (chunk) => {
            rawData += chunk;
        });

        resp.on('end', () => {
            try {
                
                snData = JSON.parse(rawData);
                var csvResult = '';
                //csvResult += '"' + headerFields.join('","') + '"\r\n';
                csvResult += json2csv({ data: snData.result, fields: snFields, fieldNames: headerFields });                
                console.log(csvResult);

                writeCsvFile(csvResult, restCallOptions.key+'_out.csv');

                // var output = writeCsv(snData.result, fields);
                // console.log(output);

            } catch (err) {
                console.error(err);
            }
        })
    }).on("error", (err) => {
        console.log("https.get error: " + err.message);
    });
}

function writeCsvFile(dataString, csvFileName) {
    fs.writeFile(csvFileName, dataString, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("file written");
    })
}