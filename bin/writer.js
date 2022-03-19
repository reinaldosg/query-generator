const fs = require("fs");   
const moment = require("moment");


function writeToSql(destination, tablename, query) {
    let timestamp = moment(new Date()).format("ddmmyyyyhhmmss");
    let outputFile = `${destination}/${tablename}${timestamp}.sql`;
    createFolderIfNotExist(destination);
    fs.writeFile(outputFile, query, function (err) {
        if (err) throw err;
        console.log('Query generated to  successfully.');
    });
}

function createFolderIfNotExist(foldername){
    if (!fs.existsSync(foldername)){
        fs.mkdirSync(foldername, { recursive: true });
    }
}

module.exports = {
    writeToSql
}