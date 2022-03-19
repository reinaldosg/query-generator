function insertGenerator(tablename, data){
    let query = "INSERT INTO \"" + tablename + "\" (";
    if(data.length > 0){
        let column = Object.keys(data[0])
        if(column.length > 0){
            query += getColumn(column) + ") VALUES ";
            data.map((element) => {
                query += `(${getValue(element)}), `;
            })
            return queryTrim(query);
        } else throw new Error("Whoops: please define your column on row 1");
    } else throw new Error("Whoops: data is empty");
}

function getColumn(column){
    let query = "";
    column.map((element) => {
        query += `"${element}", `;
    })
    return queryTrim(query);
}

function getValue(data){
    let values = Object.values(data);
    let query = ""
    values.map((element) => {
        if(element !== "NULL"){
            query += `'${element}', `;
        } else{
            query += `${element}, `
        }
    })
    return queryTrim(query);
}

function queryTrim(query){
    return query.substring(0, query.length - 2)
}


module.exports = {
    insertGenerator
}