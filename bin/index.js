#!/usr/bin/env node

const yargs = require("yargs");
const Utils = require("./utils.js");
const Reader = require("./reader.js");
const Generator = require("./generator.js");
const Writer = require("./writer.js");
const pg = require("./dbconnector.js");

const options = yargs
 .usage("Usage: -f <filepath> -d <destination> -t <tablename>")
 .option("f", { alias: "file", describe: "File .xlsx path", type: "string", demandOption: true })
 .option("d", { alias: "destination", describe: "Folder destination", type: "string", demandOption: true })
 .option("t", { alias: "table", describe: "Table Name for Insert Query", type: "string", demandOption: true })
 .check((argv) => {
    if (Utils.fileExists(argv.f)) {
        if(Utils.getExtension(argv.f) === "xlsx"){
            return true;
        } else{
            throw new Error('Whoops: makesure your file is .xlsx format');
        }
    }
    throw new Error('Whoops: filepath is not a readable file, please check your filepath');
  })
 .argv;

 try{
    let client = pg.connect()

    let data = Reader.readFile(options.file)
    let query = Generator.insertGenerator(options.table, data);
    pg.executeQuery(query, (err, res) => {
        if (err) {
            throw Error(err);
        }
        Writer.writeToSql(options.destination, options.table, query);
        client.end()
    });
} catch(error){
    console.log(error)
}