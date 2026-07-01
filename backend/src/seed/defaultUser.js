const bcrypt = require('bcrypt');
const User = require('../models/User');

const DEFAULT_EMAIL = 'test@test.com';
const DEFAULT_PASSWORD = '123456';
const DEFAULT_ROLE = 'consumer';

const seedDefaultUser = async () => {
  try {
    const existing = await User.findOne({ email: DEFAULT_EMAIL });
    if (existing) {
      const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
      const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, saltRounds);
      existing.passwordHash = passwordHash;
      await existing.save();
      console.log('Default test user verified ✔ (test@test.com / 123456)');
      return existing;
    }

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, saltRounds);

    const user = await User.create({
      email: DEFAULT_EMAIL,
      passwordHash,
      role: DEFAULT_ROLE,
    });

    console.log('Default test user created ✔ (test@test.com / 123456)');
    return user;
  } catch (err) {
    console.error('Error seeding default test user:', err?.message || err);
    throw err;
  }
};

module.exports = seedDefaultUser;
