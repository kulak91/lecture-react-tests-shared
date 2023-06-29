# Lecture Tests React

## General Info

This repository contains tests for "React. Advanced" and "React. Base" lectures.

**Note:** Some functionality require async logic ("React. Advanced" lecture) and may fail on the first try. To account for this, there is a retries for unstable tests. However tests report will display all tries as separate test cases. To determine if all tests have passed, pay attention to the final summary line, which takes into account tests' retries and will indicate whether all tests have passed. You can set number of retries for unstable tests in ENV.

## Requirements

- [NodeJS](https://nodejs.org/en/) (16.x.x);
- [NPM](https://www.npmjs.com/) (8.x.x);
- [ChromeDriver](https://chromedriver.storage.googleapis.com/) (108)

## Simple Start

1. **`npm install`** at the root
2. Fill ENV
3. Run
   - **`npm run test:base`** - for "React. Base" lecture
   - **`npm run test:advanced`** - for "React. Advanced" lecture
4. Enjoy <3
