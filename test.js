const fs = require('fs');
const { processClicks } = require('./solution');
const expectedResult = require('./expected-result.json')

const clicksJSON = fs.readFileSync('clicks.json', 'utf-8');
const clicks = JSON.parse(clicksJSON);

describe('processClicks function', () => {
    test('it should return the correct result set for a sample input', () => {
        const resultSet = processClicks(clicks);
        expect(resultSet).toEqual(expectedResult);
    });
});