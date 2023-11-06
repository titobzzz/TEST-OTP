const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const usercollection = mongoose.model("user", userschema);

module.exports = { usercollection };
