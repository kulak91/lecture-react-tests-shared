import { Options } from '@wdio/types';
import dotenv from 'dotenv';

dotenv.config();

const { APP_URL } = process.env;

const config: Options.Testrunner = {
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: './tsconfig.json',
    },
  },
  specs: ['./src/specs/**/bookings-page.spec.ts'],
  suites: {
    base: ['./src/specs/base/**'],
    advanced: ['./src/specs/advanced/**'],
  },
  maxInstances: 10,
  capabilities: [
    // {
    //   maxInstances: 5,
    //   browserName: 'chrome',
    //   acceptInsecureCerts: true,
    // },
     {
        browserName: 'chrome',
        'wdio:devtoolsOptions': {
            headless: true,
        },
      },
  ],
  logLevel: 'silent',
  bail: 0,
  baseUrl: APP_URL,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [        ['selenium-standalone', { drivers: { firefox: '0.33.0', chrome: true, chromiumedge: 'latest' } }]],
  framework: 'mocha',
  reporters: [
  'json',
  ],
  // reporters: [['spec', { showPreface: false }]],
  outputDir: './results',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
};

export { config };
