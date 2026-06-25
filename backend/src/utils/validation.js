const mongoose = require('mongoose');

const createHttpError = (statusCode, message) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

const isValidObjectId = (value) => {
  if (!value || typeof value !== 'string') return false;
  return mongoose.Types.ObjectId.isValid(value);
};

const assertValidObjectId = ({ value, field }) => {
  if (!value || typeof value !== 'string' || !value.trim()) {
    throw createHttpError(400, `Validation error: ${field} is required`);
  }

  if (!isValidObjectId(value.trim())) {
    throw createHttpError(400, `Validation error: ${field} must be a valid MongoDB ObjectId`);
  }

  return value.trim();
};

const assertRequiredNumber = ({ value, field }) => {
  if (value === undefined || value === null) {
    throw createHttpError(400, `Validation error: ${field} is required`);
  }
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw createHttpError(400, `Validation error: ${field} must be a number`);
  }
  return value;
};

const assertQuantity = (quantity) => {
  assertRequiredNumber({ value: quantity, field: 'quantity' });

  if (!Number.isInteger(quantity)) {
    throw createHttpError(400, 'Validation error: quantity must be an integer');
  }
  if (quantity <= 0) {
    throw createHttpError(400, 'Validation error: quantity must be greater than 0');
  }

  return quantity;
};

const assertRequiredNonEmptyString = ({ value, field }) => {
  if (!value || typeof value !== 'string' || !value.trim()) {
    throw createHttpError(400, `Validation error: ${field} is required`);
  }
  return value.trim();
};

module.exports = {
  createHttpError,
  isValidObjectId,
  assertValidObjectId,
  assertQuantity,
  assertRequiredNonEmptyString,
};

