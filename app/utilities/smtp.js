const mailer = require("nodemailer");

require("dotenv").config();

const config = {
  service: "gmail",
  auth: {
    user: process.env.smtpuser,
    pass: process.env.smtppassword,
  },
};

const smtp = mailer.createTransport(config);

module.exports = { smtp };
