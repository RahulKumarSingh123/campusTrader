const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    try {
        const auth = req.header("Authorization");
        const token = auth.split(" ")[1];
        console.log(req.file)
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded)
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(400).json({
                success: false,
                message: "Token not found"
            })
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

module.exports = { authMiddleware }