"use strict";

const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  file_author: {
    type: String
  },
  file_name:  {
    type: String
  },
  file_description: {
    type: String
  },
 
  file_date: {
   type: Date,
    default: Date.now
   },

 file_moderated: {
    type: Boolean,
    default: 'false'
   },

  file_version: {
    type: Number,
    default: +1
   }
 
  
});



module.exports = mongoose.model("cloud", fileSchema);