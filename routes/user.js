const express = require("express");
const  router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../Middleware.js");
const UserController = require("../controllers/Userss.js") ;
const wrapAsync = require("../utils/wrapAsync.js");


router.route("/signup")
.get( UserController.renderSignupForm)
.post( wrapAsync( UserController.Signup));
    



router.route("/login")
.get(UserController.RenderLoginform )
.post(
    saveRedirectUrl,
    passport.authenticate("local",{
    failureRedirect: '/login',
    failureFlash: true,
}),
 UserController.loginPage
);


router.get("/logout" ,UserController.logoutUser)


module.exports = router;