const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const isAdminUser = require("../middleware/admin-middleware");
const uploadMiddleware = require("../middleware/upload-middleware").default;
const {uploadImageController, fetchImagesController, deleteImageController}= require("../controllers/image-controller");
const router = express.Router()

//upload the image
router.post("/upload", authMiddleware, isAdminUser,uploadMiddleware.single("image", uploadImageController), uploadImageController);

// to get all the image
router.get("/get",authMiddleware, fetchImagesController);
module.exports = router;
//delete image route
router.delete("/:id", authMiddleware,isAdminUser,deleteImageController);