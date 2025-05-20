const ApiError = require('../error/ApiError');

function errorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }

    console.error(err);
    res.status(500).json({ message: 'Something went wrong on the server' });
}

module.exports = errorHandler;
