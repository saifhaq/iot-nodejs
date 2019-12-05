var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Temperature = require('../models/temperature');
var Humidity = require('../models/humidity');

var User = require('../models/user');

mongoose.connect('mongodb://localhost:27017/sensors',{ useNewUrlParser: true, useUnifiedTopology: true });

/* GET home page. */
router.get('/', function(req, res, next) {

  Temperature.findOne({}, {}, { sort: { 'date' : -1 } }, function(err, latestEntry) {

    var temperature = Math.round(latestEntry.temperatureC* 100)/100; 
    console.log(temperature);

    Humidity.findOne({}, {}, { sort: { 'date' : -1 } }, function(err, latestEntry) {

      var humidity = Math.round(latestEntry.humidityP* 100)/100; 
      res.render('index', {temperature: temperature, humidity: humidity});
    });
  });

});


router.get('/latest', function(req, res, next) {

  Temperature.findOne({}, {}, { sort: { 'date' : -1 } }, function(err, latestEntry) {

    var temperature = Math.round(latestEntry.temperatureC* 100)/100; 
    console.log(temperature);

    Humidity.findOne({}, {}, { sort: { 'date' : -1 } }, function(err, latestEntry) {

      var humidity = Math.round(latestEntry.humidityP* 100)/100; 

      var jsonOutput = {"temperature": temperature, "humidity": humidity}; 
      res.json(jsonOutput);
    });
  });

});

router.get('/latest/temperature', function(req, res, next) {

  Temperature.findOne({}, {}, { sort: { 'date' : -1 } }, function(err, latestEntry) {

    var temperature = Math.round(latestEntry.temperatureC* 100)/100; 
    console.log(temperature);
    res.json(temperature);
  });
});

router.get('/latest/humidity', function(req, res, next) {

  Humidity.findOne({}, {}, { sort: { 'date' : -1 } }, function(err, latestEntry) {

    var humidity = Math.round(latestEntry.humidityP* 100)/100; 
    console.log(humidity);
    res.json(humidity);
  });
});


router.post('/new/temperature/:temperatureC', function(req, res, next){
 
  var username = req.body.username; 
  var password = req.body.password; 
  var temperatureC = req.params.temperatureC

  
  user = new User({
    username: username,
    password: password,
  });

  var newEntry = new Temperature({
    temperatureC: temperatureC,
  })

  User.findOne({'username': username}, function(err, user){
    if (err){
      res.send("Some other error");
    }
    if (!user){
      res.send("Invalid username");
    }
    else if (!user.validPassword(password)){
      res.send("Wrong password");
    }
    else{
      console.log("Successfully verified");
      newEntry.save(function(err){
        if(err){
             console.log(err);
        }
      });
      res.send("Successfully saved " + temperatureC);
    }
  });

  
});

router.post('/new/humidity/:humidityP', function(req, res, next){
 
  var username = req.body.username; 
  var password = req.body.password; 
  var humidityP = req.params.humidityP

  
  user = new User({
    username: username,
    password: password,
  });

  var newEntry = new Humidity({
    humidityP: humidityP,
  })

  User.findOne({'username': username}, function(err, user){
    if (err){
      res.send("Some other error");
    }
    if (!user){
      res.send("Invalid username");
    }
    else if (!user.validPassword(password)){
      res.send("Wrong password");
    }
    else{
      console.log("Successfully verified");
      newEntry.save(function(err){
        if(err){
             console.log(err);
        }
      });
      res.send("Successfully saved " + humidityP);
    }
  });

  
});

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


module.exports = router;
