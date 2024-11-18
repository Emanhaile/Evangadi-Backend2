const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddleware");

const { addAnswer, getAnswer } = require("../Controller/answerController.js");

router.post("/addanswer/:id", authMiddleWare, addAnswer);
router.get("/getanswer/:questionid",authMiddleWare, getAnswer);

module.exports = router;
