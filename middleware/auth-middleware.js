const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"]; // Expecting "Bearer <token>"
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided. Please login to continue."
            });
        }

        const token = authHeader.split(" ")[1]; // Get the token part
        const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY || "defaultSecretKey");

        req.userInfo = decodedTokenInfo; // <-- Fixed: set to userInfo instead of user

        next(); // Move to the next middleware or route
    } catch (e) {
        console.error("Token verification failed:", e); // full error
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token. Please login again."
        });
    }
};

module.exports = authMiddleware;
