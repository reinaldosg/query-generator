const fs = require("fs");
const path = require("path");


function fileExists(path){
    return fs.existsSync(path);
}

function getExtension(filename) {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}

module.exports = {
    fileExists,
    getExtension
}