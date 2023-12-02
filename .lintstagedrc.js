module.exports = {
  '*.{js,ts}': ['prettier --write'],
  '*.{ts}': ['prettier --write', 'eslint --fix', 'jest --passWithNoTests'],
};
