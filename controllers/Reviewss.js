const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js")

module.exports.createReview = async(req,res)=>{
   const listing = await Listing.findById(req.params.id);
   if(!listing){
    return res.status(404).render("error.ejs", {message : "listing not found "});
   }
   const newreview =  new Review(req.body.review);
   newreview.author = req.user._id;
   listing.reviews.push(newreview);

   await newreview.save()
   await listing.save()

  console.log("new review saved  ! ")
  req.flash("success", " New Review is Created !")
  res.redirect(`/listings/${listing._id}`);

};


module.exports.destroyReview = async(req,res)=>{
    const{id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
     
    await Review.findByIdAndDelete(reviewId)
    req.flash("success", " Review is Deleted ! !")
    res.redirect(`/listings/${id}`)
};