const crptojs = require("crypto-js");

const { forgetpasswordval } = require("./../../schemas/joischema/user.val");
const { forgetpasswordcollection } = require("../../schemas/forgetpassword");
const { smtp } = require("../../utilities/smtp");
const { sixdigitcode } = require("../../utilities/authentication");

const forgetpassword = async (req, res) => {
  try {
    const { email, username } = req.body;

    await forgetpasswordval.validateAsync({ email, username });

    const user = await usercollection.findOne({ username }).maxTimeMS(20000);

    if (!user) {
      return res.status(404).send({
        success: false,
        error: "no user found",
        message: "no user found",
      });
    }

    const authcode = sixdigitcode(0, 99999);

    const encrypted = crptojs.AES.encrypt(
      `${email} ${authcode} ${user._id}`,
      process.env.FORGETPASSWORD
    );

    await forgetpasswordcollection.create({
      userid: user._id,
      email: email,
      token: authcode,
      encrypted: encrypted,
    });

    smtp.sendMail({
      to: email,
      subject: "Password Reset Code",
      html: `
                <div>
                    <h1>Password Reset Code</h1>
                    <div>Click <a href="#">here</a> to reset your password</div>
                    <div>or use this unique code = ${authcode}</div>
                    <div>or use this encrypted code = ${encrypted}</div>
                </div>
            `,
    });

    res.status(200).send({
      success: true,
      message: "email sent successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message || "email validation failed.",
      message: "email validation failed.",
    });
  }
};

module.exports = forgetpassword;
