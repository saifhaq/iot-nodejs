var Humidity = require('../models/humidity');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sensors',{ useNewUrlParser: true, useUnifiedTopology: true });


var humidities = 
[
    new Humidity({
        humidityP: 67,
    }),
];


var done = 0;
for (var i=0; i< humidities.length; i++)
{
    humidities[i].save(function(err,result){
        done++
        if (done===humidities.length)
        {
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
