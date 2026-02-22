const mongoose = require("mongoose");
const initData = require("./data.js")
const Listing = require("../models/listing.js")

const  MongoURl = "mongodb://127.0.0.1:27017/Wanderlust1";
main()
.then(()=>{
    console.log("connnected  to DB ");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MongoURl);
}


const intiDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({...obj, owner: "69311d807c7df24853e54293"}))
    await Listing.insertMany(initData.data);
    console.log(" data was initialized ");
};

intiDB(); 