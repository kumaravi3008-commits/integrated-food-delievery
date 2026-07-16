export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());

export const isValidPassword = (password) =>
  typeof password === 'string' && password.length >= 6;
