require('dotenv').load();

const fs = require('fs');
const path = require('path');

const ENV = process.env.NODE_ENV || 'development';
const dbConfig = loadDbConfig();
const config = Object.assign({
  db: dbConfig
});

module.exports = config;

function loadDbConfig() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  if (fs.existsSync(path.join(__dirname, './database.js'))) {
    return require('./database')[ENV];
  }
}