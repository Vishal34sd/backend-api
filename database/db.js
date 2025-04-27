const mongoose = require("mongoose");
const connectToDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb connected Successfully")
    }catch(err){
        console.log("Connection failed", err);
        process.exit();
    }
}
module.exports = connectToDB;