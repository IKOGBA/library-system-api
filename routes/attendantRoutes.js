const express = require("express");
const router = express.Router();
const attendantController = require("../controllers/attendantController");

router.post("/", attendantController.createAttendant);
router.get("/", attendantController.getAttendants);

module.exports = router;