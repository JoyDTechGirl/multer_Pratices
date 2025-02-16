const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  familyPictures: [
    {
      type: String,
      require: true,
    },
  ],
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
