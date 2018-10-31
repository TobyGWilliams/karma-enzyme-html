/* eslint-disable func-names */
const kehtml = function(files, baseReporterDecorator) {
  // things that can be passed to the reporter:'baseReporterDecorator', 'formatError', 'config'
  baseReporterDecorator(this);

  console.log(files);

  // this.onRunStart = function(browsers) {
  //   this.write('Begin Browsers!');
  //   return browsers;
  // };
};

ketml.$inject = ["config.files", "baseReporterDecorator"];

module.exports = {
  "reporter:karma-enzyme-html": ["type", kehtml]
};

// var JASMINE_CORE_PATTERN = /([\\/]karma-jasmine[\\/])/i;
// var createPattern = function (path) {
//   return { pattern: path, included: true, served: true, watched: false };
// };

// var initReporter = function (files, baseReporterDecorator) {
//   var jasmineCoreIndex = 0;

//   baseReporterDecorator(this);

//   files.forEach(function (file, index) {
//     if (JASMINE_CORE_PATTERN.test(file.pattern)) {
//       jasmineCoreIndex = index;
//     }
//   });

//   files.splice(++jasmineCoreIndex, 0, createPattern(__dirname + '/css/jasmine.css'));
//   files.splice(++jasmineCoreIndex, 0, createPattern(__dirname + '/lib/html.jasmine.reporter.js'));
//   files.splice(++jasmineCoreIndex, 0, createPattern(__dirname + '/lib/adapter.js'));
// };

// initReporter.$inject = ['config.files', 'baseReporterDecorator'];

// module.exports = {
//   'reporter:kjhtml': ['type', initReporter]
// };
