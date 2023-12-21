module.exports = {
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).js"],
  setupFiles: ["./jest.setup.js"],
  "reporters": [
      "default",
      ["jest-html-reporters", {
        "publicPath": "./html-report",
        "filename": "report.html",
        "expand": true
      }]
    ]
};
