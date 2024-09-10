const express = require("express");
const router = express.Router();
const {login,registration,userRegistration,userAuthentication} = require("../controllers/userControllers/AuthenicationController");
const {registrationValidator,loginValidator} = require("../controllers/userControllers/validationController")
const loadHome = require("../controllers/userControllers/homeController");
const {loadOtpPage,otpHandler,verifyOtp} = require("../controllers/userControllers/otpController");


router.route("/registration").get(registration).post(registrationValidator,userRegistration)
router.route("/login").get(login).post(loginValidator,userAuthentication,otpHandler);

router.route("/home").get(loadHome)
router.route("/otp").get(loadOtpPage).post(verifyOtp)







module.exports = router;