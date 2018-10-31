/* eslint-disable */
function htmlToElement(html) {
    const template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  }
  function hashFnv32a(str, asString, seed) {
    /* jshint bitwise:false */
    let i;
  
    let l;
  
    let hval = seed === undefined ? 0x811c9dc5 : seed;
  
    for (i = 0, l = str.length; i < l; i++) {
      hval ^= str.charCodeAt(i);
      hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    if (asString) {
      // Convert to 8 digit hex string
      return `0000000${(hval >>> 0).toString(16)}`.substr(-8);
    }
    return hval >>> 0;
  }
  function checkSuite(root, suite) {
    const prevSuite = root.querySelectorAll(`[data-suite="${suite}"]`);
    if (prevSuite.length === 0) {
      const newSuite = htmlToElement(`
        <div style='padding-left: 1em;' data-suite='${suite}'> - ${suite}</div>`);
      return root.appendChild(newSuite);
    }
    return prevSuite[0];
  }
  function getLeafSuite(root, suites) {
    if (suites.length === 1) {
      return checkSuite(root, suites[0]);
    }
    return getLeafSuite(checkSuite(root, suites[0]), suites.slice(1));
  }
  
  __karma__.loaded = () => {
    const body = document.querySelector('body');
    const reportsTitle = htmlToElement(`
      <h2
        style="
          background: #cc44aa;
          color:black;
          padding: 0.25em 0.5em;"
      >Test Results</h2>
    `);
  
    const reports = htmlToElement('<reports />');
  
    reports.appendChild(reportsTitle);
    body.appendChild(reports);
  };
  
  const karmaResult = __karma__.result; // store the karma result function for later use.
  
  __karma__.result = _result => {
    const testId = hashFnv32a(_result.description + _result.startTime); // create unique Id to refer to the result later
    const reports = document.querySelector('reports');
    const leafSuite = getLeafSuite(reports, _result.suite);
  
    const report = htmlToElement(`
        <report
          class="${_result.success ? 'greenText' : 'redText'}"
          data-link-result='${testId}'>
          ${_result.success ? '✔' : '✖'} ${_result.description}
        </report>`);
  
    const testResult = document.querySelectorAll('body>div:not([data-result-id])');
  
    if (testResult.length === 1) {
      testResult[0].dataset.resultId = testId;
      report.style.cursor = 'pointer';
      report.onclick = event => {
        const clickedTestId = event.srcElement.dataset.linkResult;
        const clickedTestResult = document.querySelector(`[data-result-id="${clickedTestId}"`);
        document.querySelectorAll(`.testResult`).forEach(e => {
          e.style.display = 'none';
        });
        document.querySelectorAll('.testReport').forEach(e => {
          e.style.fontWeight = 'normal';
        });
        // event.srcElement.style.fontWeight = 'bolder';
        clickedTestResult.style.display = 'block';
      };
    }
  
    leafSuite.appendChild(report);
    karmaResult(_result);
  };
  
  __karma__.start();
  