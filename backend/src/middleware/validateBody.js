const { validationErrorResponse } = require('./validationErrorHandler');

function validateBody(schema) {
  return (req, res, next) => {
    try {
      const payload = req.body ?? {};

      // Zod schema
      const result = schema.safeParse ? schema.safeParse(payload) : null;
      if (result && result.success === false) {
        return validationErrorResponse(res, result.error);
      }
      if (result && result.success === true) {
        req.validatedBody = result.data;
        return next();
      }

      // If a non-zod schema is passed, just pass through.
      return next();
    } catch (err) {
      return validationErrorResponse(res, err);
    }
  };
}

module.exports = { validateBody };

