const express = require("express");
const { signUp, logIn } = require("./controller.js"); 


const router = express.Router();

router.route('/signUp').post(signUp);
router.route('/logIn').post(logIn);


module.exports = router;