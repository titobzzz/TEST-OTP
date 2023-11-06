const express = require("express");
const router = express.Router();
const {
  login,
  register,
  forgetpassword,
  resetpassword,
} = require("../controllers/auth/auth.controller");

router.post("/login", login);
router.post("/register", register);
router.post("/forgetpassword", forgetpassword);
router.put("/resetpassword", resetpassword);

module.exports = router;
