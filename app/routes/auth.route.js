const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: "public/" });

const { isuserloggedin } = require("../middlewares/middlewares");
const {
  login,
  profile,
  register,
  forgetpassword,
  resetpassword,
} = require("../controllers/auth/auth.controller");
const { uploadprofilepic } = require("../controllers/utils/uploadprofilepic");

router.post("/login", login);
router.post("/register", register);
router.post("/forgetpassword", forgetpassword);
router.put("/resetpassword", isuserloggedin, resetpassword);
router.get("/profile", isuserloggedin, profile);
router.post(
  "/uploadprofilepic",
  isuserloggedin,
  upload.single("taskpicture"),
  uploadprofilepic
);

module.exports = router;
