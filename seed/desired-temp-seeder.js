var DesiredTemperature = require('../models/desired-temp');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sensors',{ useNewUrlParser: true, useUnifiedTopology: true });

var temp = new DesiredTemperature({

});

temp.name = 'desiredTemp';
temp.temperatureC = 19.5;

temp.save(function(err, result) {
   if (err) {
       console.log(err);
   }
   mongoose.disconnect();
});

