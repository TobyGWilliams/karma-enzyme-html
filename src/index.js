/* eslint-disable func-names */

const createPattern = function(path) {
  return { pattern: path, included: true, served: true, watched: false };
};

const kehtml = function(files, baseReporterDecorator) {
  // things that can be passed to the reporter:'baseReporterDecorator', 'formatError', 'config'
  baseReporterDecorator(this);
  files.push(createPattern(`${__dirname}/html-results-reporter.js`));
  files.push(createPattern(`${__dirname}/html-results-reporter.css`));
};

kehtml.$inject = ["config.files", "baseReporterDecorator"];

module.exports = {
  "reporter:karma-enzyme-html": ["type", kehtml]
};
