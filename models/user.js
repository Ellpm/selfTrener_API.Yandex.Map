const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  location: {},
});

userSchema.statics.createUser = async function(name, lastName, email, password, location) {
  return User.create({
    name: name,
    lastName: lastName,
    email: email,
    password: password,
    location: location
  });
};

module.exports = mongoose.model("users", userSchema);;
