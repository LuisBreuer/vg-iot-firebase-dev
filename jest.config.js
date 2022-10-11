module.exports = {

  moduleFileExtensions: [
    'js',
    'jsx',
    'json'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: "jest-environment-jsdom",
};
