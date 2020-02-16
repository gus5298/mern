var passport = require('passport');
const User = require('../models/User')
const LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');


const strategy = new LocalStrategy({
    usernameField: 'email'
 
  },
  function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
         console.log("Incorrect User")
        return done(null, false, { message: 'Incorrect username.' });
      }
      
      bcrypt.compare(password, user.password, function (err, result) {
        if (result == true) {
            console.log("Login")
            return done(null, user)

         } else {
         console.log("Incorrect password")       
         return done(null, false, { message: 'Incorrect password' })
         }
    });
    })  
  }
)

module.exports = strategy