const cloudinary = require('../config/cloudinary');
const uploadToCloudinary = async(filePath)=>{
    try{
        const result = await cloudinary.uploader.upload(filePath);
        return {
            url : result.secure_url,
            publicId : result.public_id
        }
    }catch(err){
        console.error("error while uploading to cloudinary ", err); 
        throw new Error("error while uploading to cloudinary") 
    }
}
module.exports = {uploadToCloudinary};