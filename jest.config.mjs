export default {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleDirectories: ["node_modules", "src"],
  extensionsToTreatAsEsm: ['.jsx'],
  transformIgnorePatterns: ['node_modules/(?!(module-that-needs-to-be-transformed)/)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};