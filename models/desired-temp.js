var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String},
    temperatureC: {type: Number},
});

module.exports = mongoose.model('DesiredTemperature', schema);