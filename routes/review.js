const express = require("express")
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const  {  validateReview , isAuthor , isLoggedIn} = require("../Middleware.js");
const ReviewController = require("../controllers/Reviewss.js")

// create a reviews
router.post("/", 
    isLoggedIn,
     validateReview,
    wrapAsync (ReviewController.createReview)
);


// delete Review
router.delete("/:reviewId",  
    isLoggedIn,
    isAuthor,
    wrapAsync(ReviewController.destroyReview )
);

module.exports = router;