const mongoose = require("mongoose" );
const Schema = mongoose.Schema;
const Review = require("./reviews.js");
const { ref, required } = require("joi");



const ListingSchema = new Schema({
     title : {
      type : String ,
      required : true,
     } ,
      description  : String ,
     image : {
       url: String,
      filename: String
     },
     price : Number ,
     location: String,
     country: String ,
     reviews: [
         {
          type: Schema.Types.ObjectId,
          ref : "Review"
         }
     ],
     owner:{
      type: Schema.Types.ObjectId,
      ref: "User"
     },
     geometry:{
        type:{
            type: String ,
            enum: ['Point'],
            required: true ,
        },
        coordinates:{
            type: [Number],
            required: true
        }
     }


});

ListingSchema.post("findOneAndDelete", async (listing) =>{
    if(listing){
        await Review.deleteMany({ _id: {$in : listing.reviews}});
    }
});




module.exports = mongoose.model("Listing" , ListingSchema)