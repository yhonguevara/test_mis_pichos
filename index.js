const CalculateAvailableSpot = require('./src/calendar/CalculateAvailableSpot');

function getAvailableSpots(calendar, date, duration) {
    return (new CalculateAvailableSpot(calendar)).calculate(date, duration);
}

module.exports = { getAvailableSpots }
