/**
 * Validates request data using a Zod schema.
 * @param {Object} schema - Zod validation schema.
 * @returns {Function} Express middleware.
 */
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: result.error.flatten()
      });
    }

    next();
  };
}

module.exports = validate;