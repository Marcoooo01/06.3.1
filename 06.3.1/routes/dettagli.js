var createError = require('http-errors'); //Importo la libreria per la gestione degli errori
var express = require('express');
var router = express.Router();
const sql = require('mssql');
/* GET home page. */

const config = {
  user: 'grossi.marco',  //Vostro user name
  password: 'xxx123#', //Vostra password
  server: "213.140.22.237",  //Stringa di connessione
  database: 'grossi.marco', //(Nome del DB)
}

router.get('/:unit', function (req, res, next) {
  let sqlQuery = `select * from dbo.[cr-unit-attributes] where Unit = '${req.params.unit}'`;
  executeQuery(res, sqlQuery, next);
 
});

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
      renderPug(res, result.recordset);
      return;
    });
  });
}

function renderPug(res, recordset)
{
    let re = recordset[0];
    res.render('dettagli', {
          title: `Dettagli di ${re.Unit}:`,
          re: re,
    });
}

module.exports = router;