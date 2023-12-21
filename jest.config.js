module.exports = {
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).js"],
  setupFiles: ["./jest.setup.js"],
  "reporters": [
      "default",
      ["jest-html-reporters", {
        outputPath: 'test-results/e2e_tests/report.html',
        includeFailureMsg: true
      }]
    ]
};
