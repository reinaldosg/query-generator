const { Client } = require('pg')
const { db: config } = require('../environment/index.js');
const client = new Client(config)
function connect(){
    client.connect()
    return client;
}

function executeQuery(query, callback){
    client.query(query, callback)
}

module.exports = {
    connect,
    executeQuery
}