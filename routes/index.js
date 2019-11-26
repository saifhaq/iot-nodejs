var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Temperature = require('../models/temperature');

/* GET home page. */
router.get('/', function(req, res, next) {

  Temperature.findOne({}, {}, { sort: { 'date' : -1 } }, function(err, latestEntry) {

    var temperature = Math.round(latestEntry.temperatureC* 100)/100; 
    console.log(temperature)
    res.render('index', { title: 'Express', temperature: temperature});

  });

});


router.get('/temperature/:temperatureC', function(req, res, next) {

  var newEntry = new Temperature({
    temperatureC: req.params.temperatureC
  })

  newEntry.save(function(err){
    if(err){
         console.log(err);
         return;
    }
    console.log(newEntry.temperatureC)
    res.redirect('/');
  });

});


module.exports = router;
