const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const auth = require("../../shared/middlewares/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", auth, authController.logout);

module.exports = router;