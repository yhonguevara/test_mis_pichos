const Calendar = require('./Calendar');
const OneMiniSpot = require('../spot/OneMiniSpot');
const FindSpotsAvailableForDay = require('../spot/FindSpotsAvailableForDay');

class CalculateAvailableSpot {
    #calendar = "";

    constructor (calendar) {
        this.#calendar = calendar
    }

    calculate (date, duration) {
        const calendar = new Calendar(this.#calendar);
                
        const findSpots = new FindSpotsAvailableForDay(date, calendar.spots(), calendar.sessions());
        const availableSpots = findSpots.find();

        if ( !availableSpots.length ) {
            return availableSpots
        }

        const miniSpot = new OneMiniSpot(date, duration, calendar.duration())
        
        let arrSpot = [];

        for (const spot of availableSpots) {
            let resultSpot;

            resultSpot = miniSpot.find(spot.start, spot.end);

            if (resultSpot) {
                arrSpot.push(resultSpot);
            }
        }

        return arrSpot;
    }
}

module.exports = CalculateAvailableSpot;