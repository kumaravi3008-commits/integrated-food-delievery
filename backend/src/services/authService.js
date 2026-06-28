const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const signToken = ({ userId, role, email }) => {

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not set');
  }


  const tokenExpiry = process.env.JWT_EXPIRES_IN || '7d';

  return jwt.sign(
    {
      sub: userId,
      role,
      email,
    },
    jwtSecret,
    { expiresIn: tokenExpiry }
  );
};

const register = async ({ email, password, role }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error('Email already in use');
    err.statusCode = 409;
    throw err;
  }

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User.create({ email, passwordHash, role });

  const token = signToken({ userId: user._id.toString(), role: user.role, email: user.email });

  return {
    token,
    user: {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
  };
};

const login = async ({ email, password }) => {


  const user = await User.findOne({ email });

  console.log('[auth/login] user lookup', {
    userFound: !!user,
    passwordHashExists: !!user?.passwordHash,
    passwordHashType: user?.passwordHash ? typeof user.passwordHash : undefined,
  });

  if (!user) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  // Guard to avoid bcrypt crash when invalid legacy records exist
  if (!password) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    console.log('[auth/login] missing password');
    throw err;
  }

  if (!user.passwordHash) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    console.log('[auth/login] missing passwordHash in user record');
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  const token = signToken({ userId: user._id.toString(), role: user.role, email: user.email });

  return {
    token,
    user: {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
  };
};

const getProfileById = async ({ userId }) => {
  const user = await User.findById(userId).select('_id email role');
  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }

  return {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };
};

module.exports = {
  register,
  login,
  getProfileById,
};


