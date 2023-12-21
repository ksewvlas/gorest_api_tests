module.exports = {
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).js"],
  setupFiles: ["./jest.setup.js"],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./test_results/jest-html-reporters-attach",
        filename: "report.html",
        includeFailureMsg: true,
      },
    ],
  ],
};
