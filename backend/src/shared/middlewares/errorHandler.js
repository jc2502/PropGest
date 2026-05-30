const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV !== "production") {
        console.error("ERROR:", err);
    }

    const statusCode = err.statusCode || 500;
    const message = err.isOperational
        ? err.message
        : "Error interno del servidor";

    res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
