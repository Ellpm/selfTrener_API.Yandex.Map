const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  type: String,
  color: String,
  icon: String,
  body: String,
  time: Date,
  coordinates: [],
  createdAt: String,
  updatedAt: Date,
  authorID: String,
  author: String,
  participants: [],
  avatar: String,
});

eventSchema.statics.mostRecent = async function() {
  return this.find()
    .sort("time")
    .limit(5)
    .exec();
};

module.exports = mongoose.model("events", eventSchema);
