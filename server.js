require("dotenv").config();
const express = require("express");
const app = express();
const connectToDB = require("./database/db");
connectToDB();
const authRoutes = require("./routes/auth-routes");
const homeRoutes = require("./routes/home-routes");
const adminRoutes = require("./routes/admin-routes");
const uploadImageRoutes = require("./routes/image-routes");
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/image",uploadImageRoutes);


const PORT = process.env.PORT || 3000 ;
app.listen(PORT , ()=>{
    console.log("Server is running on  port 3000");
},
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
})

);

