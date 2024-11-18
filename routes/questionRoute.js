const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')


//question controller
const {
    askQuestion,
    allQuestions,
    singleQuestion,
} = require ('../Controller/questionController.js')

router.post("/addQuestion", authMiddleware, askQuestion);
router.get("/allQuestions", authMiddleware, allQuestions);
router.get("/singleQuestion/:questionid", authMiddleware, singleQuestion);

module.exports = router;