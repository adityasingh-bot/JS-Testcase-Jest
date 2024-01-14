const fs = require('fs');
const clicksData = JSON.parse(fs.readFileSync('clicks.json', 'utf-8'));
const resultSet = processClicks(clicksData);
fs.writeFileSync('result-set.json', JSON.stringify(resultSet, null, 2), 'utf-8');

function processClicks(clicks) {
    const clicksByIP = {};
    clicks.forEach((click) => {
        const ip = click.ip;
        if (!clicksByIP[ip]) {
            clicksByIP[ip] = [];
        }
        clicksByIP[ip].push(click);
    });

    const result = [];
    for (const ip in clicksByIP) {
        const clicksForIP = clicksByIP[ip];
        clicksForIP.sort((a, b) => a.timestamp - b.timestamp);
        let clickCount = 0;
        const hourlyClicks = {};
        for (const click of clicksForIP) {
            const hourPeriod = Math.floor(click.timestamp / 3600);
            if (hourlyClicks[hourPeriod] && hourlyClicks[hourPeriod].amount >= click.amount) {
                continue;
            }
            if (clickCount >= 10) {
                break;
            }
            hourlyClicks[hourPeriod] = click;
            result.push(click);
            clickCount++;
        }
    }

    return result;
}
module.exports = { processClicks };