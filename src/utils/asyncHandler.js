/**
 * Wraps async Express route handlers and forwards errors to the global error handler.
 * @param {Function} fn - Async route handler.
 * @returns {Function} Express middleware function.
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;
