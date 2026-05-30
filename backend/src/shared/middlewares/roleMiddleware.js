const AppError = require("../errors/AppError");

const roleMiddleware = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new AppError("No autenticado", 401));
        }

        if (!roles.includes(req.user.role)) {
            return next(new AppError("Acceso denegado para este rol", 403));
        }

        next();
    };
};

module.exports = roleMiddleware;