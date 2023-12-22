const fs = require('fs');

class CalendarRepository {
    #url = "";
    #results = [];

    constructor (db) {
        this.#connect(
            this.#stringConnection(db)
        );
    }

    get () {
        this.#results = JSON.parse(this.#url);
    }

    results () {
        return this.#results;
    }

    #connect (url) {
        try {
            this.#url = fs.readFileSync(url);
        } catch (e) {
            console.error(`The connection to database was failed with error \n code: ${e.code} \n path: ${e.path}`)
        }
    }

    #stringConnection (db) {
        return `./databases/calendar.${db}.json`;
    }
}

module.exports = CalendarRepository;