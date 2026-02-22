
require('dotenv').config();

const express = require("express");
const  mongoose = require("mongoose");
const app =  express();
const path = require("path");

const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");

const session  = require("express-session")
const flash =  require("connect-flash")
const passport  = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")



const listingrouter = require("./routes/listing.js");
const reviewrouter = require("./routes/review.js");
const userrouter = require("./routes/user.js")


const  MongoURl = "mongodb://127.0.0.1:27017/Wanderlust1";

const SessionOption = {
    secret : "mysupersecretcode",
    resave: false ,
    saveUninitialized: true ,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 1000,
        httpOnly: true ,
    },
}
app.set("view engine" , "ejs")
app.set("views", path.join(__dirname , "views"));
app.use(express.urlencoded ({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs' , ejsmate)
app.use(express.static(path.join(__dirname , "public")));

main() 
.then(()=>{
    console.log("Connected Successful")
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MongoURl);
}

app.get("/" , (req , res)=>{
    console.log("hello ");
    res.send("Server Start On Root : ")
});


app.use(session(SessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
    res.locals.success =  req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});




app.use("/listings", listingrouter);
app.use("/listings/:id/reviews", reviewrouter)
app.use("/" , userrouter)


app.use((err,req,res ,next)=>{
   const{statusCode = 500 , message="Something Wents Wrong !"} = err;
   res.status(statusCode).render("error.ejs" ,{err})
})

app.listen(8080 , ()=>{
    console.log("Server Run On Port Number : 8080");
})