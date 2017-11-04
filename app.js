var https = require('https');
var fs = require('fs');
var cfg = require('./config');
var moment = require('moment');
var json2csv = require('json2csv');
var dotenv = require('dotenv');

dotenv.load();
console.log("SNOWREST2CSV v0.1 operational...");

var csvFileName = "output.csv";
var cmdKey = process.argv.slice(2)[0]; 
if (!cmdKey) {
    console.log("WARNINGERROR: you did not supply a key");

} else {
    var restCalls = cfg.calls;
    var restCallOptions = restCalls.filter(function(item) {
        return item.key == cmdKey;
    });
    if (restCallOptions.length > 0) {
        doRequest(restCallOptions[0]);
    } else {
        console.log("Unable to find any REST calls for " + cmdKey);
    }
    
}

function doRequest(restCallOptions) {
    
    // build field array from options
    var snFields = restCallOptions.fields.split(',');

    // build query string param path
    var restPath = "/api/now/table/" + restCallOptions.table;
    if (restCallOptions.query) {
        restPath += "?sysparm_query=" + restCallOptions.query;
    }
    restPath += "&sysparm_fields=" + snFields.join("%2C");
    if (restCallOptions.limit) {
        restPath += "&sysparm_limit=" + restCallOptions.limit;
    }

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
                var csvResult = json2csv({ data: snData.result, fields: snFields });                
                console.log(csvResult);

                writeCsvFile(csvResult, csvFileName);

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