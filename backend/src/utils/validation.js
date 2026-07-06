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
<<<<<<< HEAD
    throw createHttpError(400, `Validation error: ${field} is required`);
  }

  if (!isValidObjectId(value.trim())) {
    throw createHttpError(400, `Validation error: ${field} must be a valid MongoDB ObjectId`);
  }

  return value.trim();
};

=======
    if (field === 'customerId') throw createHttpError(400, 'Invalid customerId');
    throw createHttpError(400, `Invalid ${field}`);
  }

  if (!isValidObjectId(value.trim())) {
    // Required by task: clear message must be exactly "Invalid customerId" for customerId.
    if (field === 'customerId') throw createHttpError(400, 'Invalid customerId');
    throw createHttpError(400, `Invalid ${field}`);
  }


  return value.trim();
};


>>>>>>> 5b8d4cddc28bcea85d0dd37a2c8d886722be2797
const assertRequiredNumber = ({ value, field }) => {
  if (value === undefined || value === null) {
    throw createHttpError(400, `Validation error: ${field} is required`);
  }
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw createHttpError(400, `Validation error: ${field} must be a number`);
  }
  return value;
};

<<<<<<< HEAD
const assertQuantity = (quantity) => {
=======
const assertQuantity = (quantity, { allowZero = false } = {}) => {
>>>>>>> 5b8d4cddc28bcea85d0dd37a2c8d886722be2797
  assertRequiredNumber({ value: quantity, field: 'quantity' });

  if (!Number.isInteger(quantity)) {
    throw createHttpError(400, 'Validation error: quantity must be an integer');
  }
<<<<<<< HEAD
  if (quantity <= 0) {
=======
  if (quantity < 0 || (!allowZero && quantity === 0)) {
>>>>>>> 5b8d4cddc28bcea85d0dd37a2c8d886722be2797
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

