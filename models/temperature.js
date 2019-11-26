var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    temperatureC: {type: Number},
    date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Temperature', schema);