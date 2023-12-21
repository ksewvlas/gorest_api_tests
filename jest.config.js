module.exports = {
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).js"],
  setupFiles: ["./jest.setup.js"],
  "reporters": [
      "default",
      [
          "jest-html-reporters",
          {
              outputPath: './test_results',
              filename: "report.html",
              includeFailureMsg: true
          }]
    ]
};
