var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Temperature = require('../models/temperature');
var Humidity = require('../models/humidity');

var User = require('../models/user');
var DesiredTemperature = require('../models/desired-temp');

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

router.get('/latest/desiredtemp', function(req, res, next) {

  DesiredTemperature.findOne({name: "desiredTemp"}, {}, {}, function(err, temp) {

    var desiredTemp = Math.round(temp.temperatureC* 100)/100; 
    res.json(desiredTemp);
  });
});


router.post('/update/desiredtemp/:tempC', function(req, res, next){
 
  console.log("NOTHING WORKS");
  var username = req.body.username; 
  var password = req.body.password; 
  var updatedTempC = req.params.tempC;

  console.log("lol");
  user = new User({
    username: username,
    password: password,
  });


  User.findOne({'username': username}, function(err, user){
    console.log("lol");
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

      DesiredTemperature.findOneAndUpdate({name: "desiredTemp"}, {temperatureC: updatedTempC}, {}, function(err, temp) {
        if (err) throw err;
        });

      res.send("Successfully saved desired temperature: " + updatedTempC);
    }
  });

  
});

router.post('/new/:temperatureC/:humidityP', function(req, res, next){
 
  var username = req.body.username; 
  var password = req.body.password; 
  var temperatureC = req.params.temperatureC;
  var humidityP = req.params.humidityP;

  
  user = new User({
    username: username,
    password: password,
  });

  var newTemperature = new Temperature({
    temperatureC: temperatureC,
  })

  var newHumidity = new Humidity({
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
      newTemperature.save(function(err){
        if(err){
             console.log(err);
        }
      });
      newHumidity.save(function(err){
        if(err){
             console.log(err);
        }
      });
      res.send("Successfully saved temperature: " + temperatureC + ", humidity: " + humidityP);
    }
  });

  
});

router.post('/new/temperature/:temperatureC', function(req, res, next){
 
  var username = req.body.username; 
  var password = req.body.password; 
  var temperatureC = req.params.temperatureC;

  
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
  var humidityP = req.params.humidityP;

  
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
