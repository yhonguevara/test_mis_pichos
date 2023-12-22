const CalendarRepository = require('./CalendarRepository');

class Calendar {
    #duration = {
        before: 0,
        after: 0
    };

    #spots = {};

    #sessions = {};

    constructor (calendar) {
        this.#loadCalendar(calendar);
    }

    spots () {
        return this.#spots;
    }

    sessions () {
        return this.#sessions;
    }

    duration () {
        return this.#duration;
    }

    durationBefore () {
        return this.#duration.before;
    }

    durationAfter () {
        return this.#duration.after;
    }

    #loadCalendar (calendar) {
        let calendarRepositoy = new CalendarRepository(calendar);

        calendarRepositoy.get();
        
        let data = calendarRepositoy.results();
        this.#duration.before = data.duration.before;
        this.#duration.after = data.duration.after;
        this.#spots = data.spots;
        this.#sessions = data.sessions;
    }
}

module.exports = Calendar;
