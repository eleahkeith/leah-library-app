// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [path.join(__dirname, 'src/__tests__/**/*.spec.ts')],
};
