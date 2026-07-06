const {
  assertValidObjectId,
  assertQuantity,
} = require('../utils/validation');

const createValidationErrorResponse = (res, err) => {
  return res.status(400).json({ success: false, message: err?.message || 'Validation error' });
};

const validateAddItem = (req, res, next) => {
  try {
    const { menuItemId, quantity } = req.body || {};

    req.validatedCartBody = {
      menuItemId: assertValidObjectId({ value: menuItemId, field: 'menuItemId' }),
      quantity: assertQuantity(quantity),
    };

    return next();
  } catch (err) {
    return createValidationErrorResponse(res, err);
  }
};

const validateRemoveItem = (req, res, next) => {
  try {
    const { menuItemId } = req.params || {};

    req.validatedCartParams = {
      menuItemId: assertValidObjectId({ value: menuItemId, field: 'menuItemId' }),
    };

    return next();
  } catch (err) {
    return createValidationErrorResponse(res, err);
  }
};

const validateUpdateQuantity = (req, res, next) => {
  try {
    const { menuItemId } = req.params || {};
    const { quantity } = req.body || {};

    req.validatedCartParams = {
      menuItemId: assertValidObjectId({ value: menuItemId, field: 'menuItemId' }),
    };
    req.validatedCartBody = {
      quantity: assertQuantity(quantity, { allowZero: true }),
    };

    return next();
  } catch (err) {
    return createValidationErrorResponse(res, err);
  }
};

module.exports = {
  validateAddItem,
  validateRemoveItem,
  validateUpdateQuantity,
};
