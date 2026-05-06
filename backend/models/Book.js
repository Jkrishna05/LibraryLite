const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  image: String,
  count: { type: Number, default: 1 }
});

module.exports = mongoose.model("Book", bookSchema);