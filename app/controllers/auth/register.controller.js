const bcrypt = require("bcrypt");

require("dotenv").config();

const { usercollection } = require("../../schemas/user.schema");
const { registerval } = require("../../schemas/joischema/user.val");

const register = async (req, res) => {
  try {
    const { username, phonenumber, password } = req.body;

    await registerval.validateAsync({ username, phonenumber, password });

    const isUserPresent = await usercollection
      .findOne({ username })
      .maxTimeMS(20000);

    if (isUserPresent) {
      return res.status(409).send({
        success: false,
        error: "username already exists",
        message: "sign up failed.",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(password, salt);

    await usercollection.create({
      username,
      phonenumber,
      password: hashedpassword,
    });

    res.status(201).send({
      success: true,
      message: "sign up successfull.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message || "sign up failed.",
      message: "sign up failed",
    });
  }
};

module.exports = register;
