const bcrypt = require("bcrypt");
const cryptojs = require("crypto-js");

const { resetpasswordval } = require("../../schemas/joischema/user.val");
const { usercollection } = require("../../schemas/user.schema");
const { forgetpasswordcollection } = require("../../schemas/forgetpassword");

const resetpassword = async (req, res) => {
  try {
    const { newpassword, token } = req.body;

    await resetpasswordval.validateAsync({ newpassword });

    const user = await forgetpasswordcollection
      .findOne({ token })
      .maxTimeMS(20000);

    if (!user) {
      return res.status(404).send({
        success: false,
        error: "invalid token",
        message: "invalid token",
      });
    }

    const decrypted = cryptojs.AES.decrypt(token, process.env.FORGETPASSWORD);
    const decryptedtext = decrypted.toString(cryptojs.enc.Utf8);

    const { email, authcode, userid } = decryptedtext.split(" ");

    const newhashedpassword = bcrypt.hashSync(
      newpassword,
      bcrypt.genSaltSync(10)
    );

    await usercollection.findByIdAndUpdate(userid, {
      password: newhashedpassword,
    });

    await forgetpasswordcollection.findOneAndDelete({ email });

    res.status(200).send({
      success: true,
      message: "Password changed successful",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message || "reset password failed.",
      message: "reset password failed.",
    });
  }
};

module.exports = resetpassword;
