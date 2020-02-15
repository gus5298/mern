"use strict";
const bcrypt = require('bcryptjs');

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String
  },
  password:  {
    type: String
  }
 
  
});


// userSchema.methods = {
//   checkPassword: function (inputPassword) {
//   return bcrypt.compareSync(inputPassword, this.password)
// },
//   hashPassword: plainTextPassword => {
//   return bcrypt.hashSync(plainTextPassword, 10)
//   }
// }

module.exports = mongoose.model("user", userSchema);