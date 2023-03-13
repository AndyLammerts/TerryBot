var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "testdb",
  connectTimeout: 60000
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

function queryDatabase(query, callback) {
    con.query(query, function(err, result, fields) {
      if (err) throw err;
      callback(result);
    });
  }
  
  module.exports = {
    queryDatabase: queryDatabase
  };