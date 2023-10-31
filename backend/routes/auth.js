const express = require("express");
const {
  register,
  login,
  logout,
  verifyAccess,
} = require("../controllers/auth");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/verify-access").get(verifyAccess);

module.exports = router;
