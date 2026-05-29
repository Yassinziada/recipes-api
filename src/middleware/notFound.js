const ApiError = require("../utils/ApiError");

/**
 * Handles requests to routes that do not exist.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
 */
function notFound(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
}

module.exports = notFound;
