const DateHelper = require('../helpers/DateHelper');

class OneMiniSpot {
    #dateISO = "";
    #duration = 0;
    #durationBefore = 0;
    #durationAfter = 0;

    constructor (date, duration, calendarDuration) {
        this.#dateISO = DateHelper.toISO(date, 'DD-MM-YYYY');
        this.#duration = duration;
        this.#durationBefore = calendarDuration.before;
        this.#durationAfter = calendarDuration.after;
    }

    find (startHourSpot, endHourSpot) {
        const startHour = `${this.#dateISO} ${startHourSpot}`
        const totalDuration = this.#durationBefore + this.#duration + this.#durationAfter;

        const endHour = DateHelper.addTime(startHour, totalDuration, 'minutes', 'HH:mm');
        const clientStartHour = DateHelper.addTime(startHour, this.#durationBefore, 'minutes', 'HH:mm');
        const clientEndHour = DateHelper.addTime(startHour, this.#duration, 'minutes', 'HH:mm');
        
        if (DateHelper.toTimestampUTC(endHour, 'HH:mm') > DateHelper.toTimestampUTC(endHourSpot, 'HH:mm')) {
            return null;
        }

        const spot = {
            startHour: DateHelper.toDateUTC(`${this.#dateISO} ${startHourSpot}`),
            endHour: DateHelper.toDateUTC(`${this.#dateISO} ${endHour}`),
            clientStartHour: DateHelper.toDateUTC(`${this.#dateISO} ${clientStartHour}`),
            clientEndHour: DateHelper.toDateUTC(`${this.#dateISO} ${clientEndHour}`),
        };

        return spot;
    }
}

module.exports = OneMiniSpot;