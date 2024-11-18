const express = require('express');
const router = express.Router();

//authontication middleware
const authMiddleware = require('../middleware/authMiddleware')

// user controller
const { register, login, checkUser} = require ('../Controller/userController.js')

//register routes
router.post("/register", register)

//login user
router.post("/login", login)

// check user
router.get("/check",authMiddleware ,checkUser)


module.exports = router