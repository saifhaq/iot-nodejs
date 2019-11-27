var Temperature = require('../models/temperature');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sensors',{ useNewUrlParser: true, useUnifiedTopology: true });


var temperatures = 
[
    new Temperature({
        temperatureC: (Math.random()*20)+2,
        date: randomDate(new Date(2019, 1, 1), new Date(2019, 12, 3))
    }),
];


var done = 0;
for (var i=0; i< temperatures.length; i++)
{
    temperatures[i].save(function(err,result){
        done++
        if (done===temperatures.length)
        {
            exit();
        }
    });
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}



function exit(){
    mongoose.disconnect();
}
