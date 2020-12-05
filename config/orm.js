// Importing connection //
const connection = require("../config/connection.js");

// Helper function to assign correct amount of quesstion marks. //
function printQuestionMarks(num) {
    const arr = [];
    
    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

// Helper function to convert object key to value pairs to be entered into SQL query //

function objToSql(ob) {
    const arr = [];

    for (let key in ob) {
        let value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }

            arr.push(key + "=" + value);
        }
    }

    return arr.toString();
}

// ORM Object with with SQL query functions//
const orm = {

   selectAll: function(tableInput, cb) {
       let queryString = "SELECT * FROM " + tableInput + ";";
       connection.query(queryString, function(err, result) {
           if (err) {
               throw err;
           }
           cb(result);
       });
   },
   
   insertOne: function(table, cols, vals, cb) {
       let queryString = "INSERT INTO " + table;

       querystring += " (";
       queryString += cols.toString();
       queryString += ") ";
       querytring += printQuestionMarks(vals.length);
       queryString += ") ";

       console.log(queryString);

       connection.query(queryString, vals, function(err, result) {
           if (err) {
               throw err;
           }

           cb(result);
       });
   },

   updateOne: function(table, objColVals, condition, cb) {
       let queryString = "UPDATE " + table;

       queryString += " SET ";
       queryString += objToSql(objColVals);
       queryString += " WHERE ";
       queryString += condition;

       console.log(queryString);
       connection.query(querySTring, function (err, result) {
           if (err) {
               throw err;
           }

           cb(result);
       })

   },
}

module.exports = orm;