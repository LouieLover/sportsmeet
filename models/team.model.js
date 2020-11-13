const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Team = new Schema({
  user: {
    type: String,
  },
  team: {
    type: String,
  },
  location: {
    type: String,
  },
  coords: {
    lat: Number,
    lng: Number,
  },
  completed: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Team", Team);
