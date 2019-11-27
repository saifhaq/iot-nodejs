var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Temperature = require('../models/temperature');
mongoose.connect('mongodb://localhost:27017/sensors',{ useNewUrlParser: true, useUnifiedTopology: true });

/* GET home page. */
router.get('/', function(req, res, next) {

  Temperature.findOne({}, {}, { sort: { 'date' : -1 } }, function(err, latestEntry) {

    var temperature = Math.round(latestEntry.temperatureC* 100)/100; 
    console.log(temperature);
    res.render('index', { title: 'Express', temperature: temperature});

  });

});


router.get('/temperature/:temperatureC', function(req, res, next) {

  var temperatureC = req.params.temperatureC

  var newEntry = new Temperature({
    temperatureC: temperatureC,
  })


  newEntry.save(function(err){
    if(err){
         console.log(err);
         return;
    }
  
    console.log(newEntry.temperatureC);
    console.log(newEntry);
    res.render('index', {title: 'Express', temperature: newEntry.temperatureC});
  });

});


function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


module.exports = router;
