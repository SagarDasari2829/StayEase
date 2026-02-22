const User = require("../models/user.js")

module.exports.renderSignupForm =  (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.Signup = async(req,res)=>{
    try{
    let {username, email,password} = req.body;
    const newuser = User({email, username});
    const registerUser = await User.register(newuser, password);
    console.log(registerUser);
    req.login(registerUser,(err)=>{
        if(err){
            next(err);
        }
        req.flash("success" , " Welcome to Wanderlust !");
        res.redirect("/listings")
    });
} catch(e){
        req.flash("error" , e.message)
        res.redirect("/signup");

    }
 };

 module.exports.RenderLoginform = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.loginPage = async(req,res)=>{
    req.flash("success" , "Welcome To Wanderlust your Successfully Login ! ");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl );
};

module.exports.logoutUser =  (req,res,err)=>{
    req.logOut((err)=>{
        if(err){
          return  next(err);
        }
        req.flash("success" , "You are logged out ! ");
        res.redirect("/listings");
    })
};