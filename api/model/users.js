const mongoose = require("mongoose");
const path = require("path");

const usersSchema = new mongoose.Schema({
  // Описываем модель Page. То есть из чего состоит динамическая страница сайта.

  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    // У каждой страницы автоматически сохраняется дата создания.
    type: String,
    required: true,
  }
});


module.exports = mongoose.model("users", usersSchema);

