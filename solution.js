const fs = require('fs');

// Read and parse clicks.json
const clicksData = JSON.parse(fs.readFileSync('clicks.json', 'utf-8'));

// Implement the algorithm to process clicks and generate the result set
const resultSet = processClicks(clicksData);

// Write result set to result-set.json
fs.writeFileSync('result-set.json', JSON.stringify(resultSet, null, 2), 'utf-8');

// processClicks function to be implemented
function processClicks(clicks) {
    // Group clicks by IP address
    const clicksByIP = {};
    clicks.forEach((click) => {
        const ip = click.ip;
        if (!clicksByIP[ip]) {
            clicksByIP[ip] = [];
        }
        clicksByIP[ip].push(click);
    });

    // Iterate through each IP
    const result = [];
    for (const ip in clicksByIP) {
        const clicksForIP = clicksByIP[ip];

        // Sort clicks by timestamp
        clicksForIP.sort((a, b) => a.timestamp - b.timestamp);

        let clickCount = 0;
        const hourlyClicks = {};

        // Iterate through each click for the IP
        for (const click of clicksForIP) {
            const hourPeriod = Math.floor(click.timestamp / 3600);

            // Only consider clicks within the last hour
            if (hourlyClicks[hourPeriod] && hourlyClicks[hourPeriod].amount >= click.amount) {
                continue;
            }

            // Check if the IP exceeds 10 clicks
            if (clickCount >= 10) {
                break;
            }

            // Update hourlyClicks with the most expensive click
            hourlyClicks[hourPeriod] = click;
            result.push(click);

            clickCount++;
        }
    }

    return result;
}
module.exports = { processClicks };