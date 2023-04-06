export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ["text", "lcov"],
  coverageThreshold:
    (process.env.THRESHOLD === "100" && {
      global: {
        branches: 50,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    }) ||
    undefined,
  testEnvironment: "jest-environment-node",
  transform: {},
};
