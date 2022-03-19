const XLSX = require("xlsx");

function readFile(filepath){
    var workbook = XLSX.readFile(filepath);
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]],{defval:""});
    return xlData;
}

module.exports = {
    readFile
}