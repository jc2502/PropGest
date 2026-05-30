const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return next(new AppError("Token no proporcionado", 401));
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(new AppError("Token expirado", 401));
        }
        return next(new AppError("Token inválido", 401));
    }
};

module.exports = authMiddleware;