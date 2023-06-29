// eslint-disable-next-line @typescript-eslint/no-var-requires
const mergeResults = require('wdio-json-reporter/mergeResults');

mergeResults('./results', 'wdio-*', 'report.json');
