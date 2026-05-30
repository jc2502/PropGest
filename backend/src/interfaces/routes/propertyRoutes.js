const express = require("express");
const router = express.Router();

const controller = require("../controllers/PropertyController");
const auth = require("../../shared/middlewares/authMiddleware");

router.get("/public", controller.getPublic);
router.get("/public/:id", controller.getPublicById);
router.post("/", auth, controller.create);
router.get("/", controller.getAll);

module.exports = router;