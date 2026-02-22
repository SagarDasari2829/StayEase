const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

/* ================= INDEX ================= */
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

/* ================= NEW FORM ================= */
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

/* ================= SHOW LISTING ================= */
module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

/* ================= CREATE LISTING ================= */
module.exports.createListing = async (req, res) => {
  // Geocoding
  const geoResponse = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();
   console.log(geoResponse.body.features[0].geometry)
  const newListing = new Listing(req.body.listing);

  // Owner
  newListing.owner = req.user._id;

  // Geometry safety check
  if (geoResponse.body.features.length > 0) {
    newListing.geometry = geoResponse.body.features[0].geometry;
  }

  // Image upload safety
  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await newListing.save();
 console.log(newListing)
  req.flash("success", "New Listing Created Successfully!");
  res.redirect("/listings");
};

/* ================= EDIT FORM ================= */
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url.replace(
    "/upload",
    "/upload/h_200,w_200"
  );

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

/* ================= UPDATE LISTING ================= */
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    await listing.save();
  }

  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${id}`);
};

/* ================= DELETE LISTING ================= */
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing Deleted Successfully!");
  res.redirect("/listings");
};
