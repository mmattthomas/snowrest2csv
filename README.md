# ServiceNow Table API to CSV tool

## Introduction

This tool used to make rest API call to ServiceNow instance and write out local CSV file with results.  Built to use as utility until SOUP integration can be leveraged

## Use
System has configuration data stored in config.js - this includes an array of "calls" indentified by key... each call is for a table and has the params, etc. to get

use like:
    $ node app.js customer_account customeraccount.csv


Note: You need .env file with these params:
    RESTAPI_USER={soap, etc. read account}
    RESTAPI_PASS={password}