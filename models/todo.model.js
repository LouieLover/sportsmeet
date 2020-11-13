const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Todo = new Schema({
  todo_Team: {
    type: String,
  },
  todo_Location: {
    type: String,
  },
  todo_Description: {
    type: String,
  },
  todo_completed: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Todo", Todo);
