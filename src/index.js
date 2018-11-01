const TestBed = require("./test-bed");

const createPattern = function(path) {
  return { pattern: path, included: true, served: true, watched: false };
};

const kehtml = function(files, baseReporterDecorator) {
  baseReporterDecorator(this);
  files.push(createPattern(`${__dirname}/html-results-reporter.js`));
  files.push(createPattern(`${__dirname}/html-results-reporter.css`));
};

kehtml.$inject = ["config.files", "baseReporterDecorator"];

module.exports = {
  browserReporter: {
    "reporter:karma-enzyme-html": ["type", kehtml]
  },
  TestBed
};
