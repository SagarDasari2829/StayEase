const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn    ,  isOwner ,validateListing  } = require("../Middleware.js");    
const listingsController = require("../controllers/listings.js");


const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const Listing = require("../models/listing.js")


router.get("/search" , async(req , res)=>{
  const {q} = req.query||{};
  let allListings;

  if(!q || q.trim()==""){
    allListings = await Listing.find({})
  }else{
    allListings = await  Listing.find({
    title:{$regex: q.trim(),$options:"i"}
 });
  }
  res.render("listings/index",{allListings})
})


/* ================= INDEX + CREATE ================= */
router
  .route("/")
  .get(wrapAsync(listingsController.index))
  .post(
     isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingsController.createListing)
    

  );

/* ================= NEW FORM ================= */
router.get("/new",isLoggedIn , listingsController.renderNewForm);

/* ================= SHOW / UPDATE / DELETE ================= */
router
  .route("/:id")
  .get(wrapAsync(listingsController.showListing))
  .put(
   isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingsController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingsController.deleteListing)
  );

/* ================= EDIT FORM ================= */
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingsController.renderEditForm)
);


module.exports = router;
