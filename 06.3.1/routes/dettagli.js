var createError = require('http-errors'); //Importo la libreria per la gestione degli errori
var express = require('express');
var router = express.Router();
/* GET home page. */

router.get('/:unit/', function(req, res, next){
 let poeta = people.persone.find(p => p.unit == req.params.unit)
 if (typeof poeta === "undefined") {
   return next(createError(404, 'Persona non trovata'));
 }
 else
 {
   res.render('specifiche', {
    title: `Specifiche di: ${poeta.name}`,
    poeta,
  }); ; 
 }
})

module.exports = router;