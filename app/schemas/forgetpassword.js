const mongoose = require("mongoose");

const forgetpasswordschema = new mongoose.Schema({
  userid: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  email: {
    type: String,
  },
  token: {
    type: String,
  },
  encrypted: {
    type: String,
  },
});

const forgetpasswordcollection = mongoose.model(
  "forgetpassword",
  forgetpasswordschema
);

module.exports = { forgetpasswordcollection };
