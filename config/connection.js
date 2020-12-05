// Setting up dependencies and setting up node to Myql //
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB,
    multipleStatements: true,
});

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId); 
});

// Exporting connection for ORM use.
module.exports = connection;