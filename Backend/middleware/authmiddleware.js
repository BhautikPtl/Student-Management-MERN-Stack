const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Not Authorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};

exports.adminonly = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "You Are not Admin" });
    }

    next();
};
