const mongoose = require("mongoose");

const sportSchema = new mongoose.Schema({
  name: String,
});

sportSchema.statics.mostRecent = async function () {
  return this.find()
    .sort("createdAt")
    .limit(10)
    .exec();
};

module.exports = mongoose.model("sports", sportSchema);
