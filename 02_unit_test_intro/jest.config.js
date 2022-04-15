const { defaults } = require("jest-config");

// copy and paste from official doc
// https://jestjs.io/docs/configuration#roots-arraystring
module.exports = {
  roots: ["<rootDir>/src"],
  transform: { "\\.[jt]sx?$": "ts-jest" },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["**/*.{js,jsx}"],
};
