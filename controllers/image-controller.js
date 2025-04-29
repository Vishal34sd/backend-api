const Image = require("../model/Image"); // Correct capitalization of the model
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");
const claudinary = require("../config/cloudinary");

const uploadImageController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "File is required. Please upload an image"
            });
        }

        // Upload to Cloudinary
        const { url, publicId } = await uploadToCloudinary(req.file.path);

        // Store the image URL and public ID along with the uploaded user ID in the database
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
            //const userId = req.userInfo.userId;
        });

        await newlyUploadedImage.save();

        res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            image: newlyUploadedImage
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

const  fetchImagesController = async (req, res)=>{
    try{
        const images = await Image.find({});
        if(images){
            res.status(200).json({
                sucess : true,
                data : images
            })
        }

    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "can't fetch the images"
        }); 
    }
}
const deleteImageController = async(req , res)=>{
    try{
        const getCurrentIdOfImageToBeDeleted = req.params.id;
        const userId = req.userInfo.userId;

        const image = await Image.findById(getCurrentIdOfImageToBeDeleted);

        if(!image){
            return res.status(404).json({
                success : false,
                message : "Image not found"
            });
        }
        if(image.uploadedBy.toString()!==userId){
            return res.status(401).json({
                sucess : false , 
                message : "You are not authorised to delete this image"
            });
        }
        //delete this image first from your cloudinary storage
        await claudinary.uploader.destroy(image.publicId);

        //delete this image from mongodb database
        await Image.findByIdAndUpdate(getCurrentIdOfImageToBeDeleted);
        res.status(200).json({
            success : true , 
            message : "image deleted successfully from database"
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "something went wrong" });
    }
}

module.exports = { uploadImageController , fetchImagesController , deleteImageController};


