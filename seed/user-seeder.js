var User = require('../models/user');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sensors',{ useNewUrlParser: true, useUnifiedTopology: true });

var newUser = new User({});

newUser.username = "saif";
newUser.password = newUser.encryptPassword('someEncryptedPassword?');
console.log(newUser);
newUser.save(function(err, result) {
   if (err) {
       console.log(err);
   }
   mongoose.disconnect();
});



