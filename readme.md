Dependencies
Jest: A JavaScript testing framework. Jest provides a simple and powerful testing environment with features like test suites, assertions, and test coverage.

Jest was chosen for its ease of use, comprehensive documentation, and popularity within the JavaScript community.

File System module (fs): The Node.js File System module is used for handling file operations, such as reading and writing to files.

The fs module is essential for reading the input data from clicks.json and writing the result set to result-set.json.

1. Install dependencies:
npm install

2. Running the Solution
To run the solution and generate the result set:
npm run solution
The result set will be stored in result-set.json.

3. Running Tests
To run the test suite:
npm run test

4. Ensure that Jest is installed as a dev dependency:
npm install --save-dev jest

File Structure:
project-root
|-- solution.js
|-- tests.js
|-- clicks.json
|-- jest.config.js
|-- package.json
|-- result-set.json
|-- README.md
