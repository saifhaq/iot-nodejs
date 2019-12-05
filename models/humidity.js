var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    humidityP: {type: Number},
    date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Humidity', schema);