const { ZodError } = require('zod');

function toValidationMessage(err) {
  if (err instanceof ZodError) {
    const issues = err.issues || [];
    const first = issues[0];
    if (first?.message) return first.message;
    return 'Validation error';
  }

  return err?.message || 'Validation error';
}

function validationErrorResponse(res, err) {
  const message = toValidationMessage(err);
  return res.status(400).json({ success: false, message });
}

module.exports = {
  validationErrorResponse,
};

