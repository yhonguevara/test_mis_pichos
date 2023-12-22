const DateHelper = require('../helpers/DateHelper');

class FindSpotsAvailableForDay {
    #spots = {};
    #sessions = {};
    #date = '';

    constructor (date, spots, sessions) {
        this.#date = date;
        this.#spots = spots;
        this.#sessions = sessions;
    }

    find () {
        let daySpots = this.#getSpotsToDay();
        let daySessions = this.#getSessionsToDay();

        return this.#findFreeSpots(daySpots, daySessions);
    }

    #getSpotsToDay () {
        let spots = [];

        for (const key in this.#spots) {
            if (key === this.#date) {
                spots = this.#spots[key];
                break;
            }
        }

        return spots;
    }

    #getSessionsToDay() {
        let sessions = [];

        for (const key in this.#sessions) {
            if (key === this.#date) {
                sessions = this.#sessions[key];
                break;
            }
        }

        return sessions;
    }

    #findFreeSpots (spots, sessions) {
        let spotsAvailables = [];

        if ( !sessions.length ) {
            return spots
        }

        for (const spot of spots) {
            spotsAvailables = spotsAvailables.concat(
                this.#removeSpotsOccupied(spot, sessions)
            )
        }

        return spotsAvailables;
    }

    #removeSpotsOccupied (daySpot, sessions) {
        const dateISO = DateHelper.toISO(this.#date, 'DD-MM-YYYY');
        const realSpots = []
        
        let noConflicts = true
 
        const spotHourStart = DateHelper.toTimestamp(`${dateISO} ${daySpot.start}`);
        const spotHourEnd = DateHelper.toTimestamp(`${dateISO} ${daySpot.end}`);

        for (const session of sessions) {
            let sessionStart = DateHelper.toTimestamp(`${dateISO} ${session.start}`);
            let sessionEnd = DateHelper.toTimestamp(`${dateISO} ${session.end}`);

            if (sessionStart > spotHourStart && sessionEnd < spotHourEnd) {

                realSpots.push({ start: daySpot.start, end: session.start})
                realSpots.push({ start: session.end, end: daySpot.end})
                noConflicts = false

            } else if (sessionStart === spotHourStart && sessionEnd < spotHourEnd) {
                
                realSpots.push({ start: session.end, end: daySpot.end})
                noConflicts = false

            } else if (sessionStart > spotHourStart && sessionEnd === spotHourEnd) {

                realSpots.push({ start: daySpot.start, end: session.start})
                noConflicts = false

            } else if (sessionStart === spotHourStart && sessionEnd === spotHourEnd) {
                
                noConflicts = false
            }
        }
        
        if (noConflicts) {
            realSpots.push(daySpot)
        }

        return realSpots;
    }
}

module.exports = FindSpotsAvailableForDay;