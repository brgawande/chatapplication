const express = require("express");
const { sendMessage, getMessages } = require("../controllers/chatControllers");

const router = express.Router();

router.post("/send", sendMessage);
router.get("/messages/:userId", getMessages);

module.exports = router;
