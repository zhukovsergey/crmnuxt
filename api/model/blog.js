const mongoose = require("mongoose");
const path = require("path");

const blogSchema = new mongoose.Schema({
  // Описываем модель Page. То есть из чего состоит динамическая страница сайта.

  ticket: { 
    type: Date
  },
  time: [String]  
  ,
  createdDate: {
    type: Date,
    default: Date.now,
  },
  
});


module.exports = mongoose.model("blog", blogSchema);

