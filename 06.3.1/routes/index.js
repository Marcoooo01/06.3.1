var express = require('express');
var router = express.Router();
const sql = require('mssql');
var createError = require('http-errors');
const fs = require('fs');

const config = {
  user: 'grossi.marco',  //Vostro user name
  password: 'xxx123#', //Vostra password
  server: "213.140.22.237",  //Stringa di connessione
  database: 'grossi.marco', //(Nome del DB)
}

//Function to connect to database and execute query
let executeQuery = function (res, query, next) {
  sql.connect(config, function (err) {
    if (err) { //Display error page
      console.log("Error while connecting database :- " + err);
      res.status(500).json({success: false, message:'Error while connecting database', error:err});
      return;
    }
    var request = new sql.Request(); // create Request object
    request.query(query, function (err, result) { //Display error page
      if (err) {
        console.log("Error while querying database :- " + err);
        res.status(500).json({success: false, message:'Error while querying database', error:err});
        sql.close();
        return;
      }

      sql.close();
      return result.recordset;
     
    });
  });
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  let sqlQuery = "select * from dbo.[cr-unit-attributes]";
  let recordset = executeQuery(res, sqlQuery, next);
   res.render('index', {
          title: 'Tutti le unità:',
          re: recordset,
      }); //Il vettore con i dati è nel campo recordset (puoi loggare result per verificare)
      let data = JSON.stringify(result.recordset);
      fs.writeFileSync('clash.json', data);
});

module.exports = router;