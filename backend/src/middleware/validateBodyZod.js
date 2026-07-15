const { validationErrorResponse } = require('./validationErrorHandler');

function validateBody(schema) {
  return (req, res, next) => {
    try {
      const payload = req.body ?? {};

      const result = schema.safeParse(payload);
      if (!result.success) {
        return validationErrorResponse(res, result.error);
      }

      req.validatedBody = result.data;
      return next();
    } catch (err) {
      return validationErrorResponse(res, err);
    }
  };
}

module.exports = { validateBody };

