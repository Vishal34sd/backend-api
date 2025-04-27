const express = require("express");
const router = express.Router();
const adminMiddleaware = require('../middleware/admin-middleware');
const authMiddleware = require("../middleware/auth-middleware");

router.get("/welcome",authMiddleware, adminMiddleaware, (req,res)=>{
    res.json({message : "Welcome to the admin page "})
    console.log(error);
});
module.exports = router ;