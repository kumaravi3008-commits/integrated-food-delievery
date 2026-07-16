const bcrypt = require('bcrypt');
const User = require('../models/User');

const DEFAULT_PASSWORD = '123456';
const DEFAULT_USERS = [
  { email: 'test@test.com', role: 'consumer', label: 'Default consumer' },
  { email: 'owner@test.com', role: 'restaurant_owner', label: 'Restaurant owner' },
  { email: 'courier@test.com', role: 'courier', label: 'Courier' },
];

const hashPassword = async () => {
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
  return bcrypt.hash(DEFAULT_PASSWORD, saltRounds);
};

const seedUser = async ({ email, role, label }) => {
  const passwordHash = await hashPassword();
  const existing = await User.findOne({ email });

  if (existing) {
    existing.passwordHash = passwordHash;
    existing.role = role;
    await existing.save();
    console.log(`${label} verified ✔`);
    return existing;
  }

  const user = await User.create({
    email,
    passwordHash,
    role,
  });

  console.log(`${label} created ✔`);
  return user;
};

const seedDefaultUser = async () => {
  try {
    for (const userData of DEFAULT_USERS) {
      await seedUser(userData);
    }
  } catch (err) {
    console.error('Error seeding default users:', err?.message || err);
    throw err;
  }
};

module.exports = seedDefaultUser;
