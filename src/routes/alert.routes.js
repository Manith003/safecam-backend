const express = require("express");
const controller = require("../controllers/alert.controller");

const router = express.Router();

router.post("/new", controller.newAlert);
router.post("/confirm", controller.confirmAlert);
router.post("/dismiss", controller.dismissAlert);
router.get("/all", controller.getAlerts);

module.exports = router;
