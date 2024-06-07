module.exports = {
  testEnvironment: 'jsdom', // Specifies the test environment
  "moduleNameMapper": {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/fileMock.js",
    "\\.(css|less)$": "<rootDir>/mocks/fileMock.js",
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["html", "text", "text-summary"],
    // other configurations can go here

  }
  // moduleDirectories: [
  //   'node_modules',
  //   'src', 
  // ],
  
};
