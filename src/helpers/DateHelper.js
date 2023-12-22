const moment = require('moment');

class DateHelper {
    static toISO (date, originFormat) {
        return moment(date, originFormat).format('YYYY-MM-DD');
    }

    static toTimestamp (datetime) {
        return moment(datetime).valueOf();
    }

    static addTime (datetime, amount, unit, format) {
        return moment(datetime).add(amount, unit).format(format);
    }

    static subtractTime (datetime, amount, unit, format) {
        return moment(datetime).subtract(amount, unit).format(format);
    }

    static toDateUTC (datetime) {
        return moment.utc(datetime).toDate()
    }

    static toTimestampUTC (datetime, originFormat) {
        return moment.utc(datetime, originFormat).valueOf();
    }
}

module.exports = DateHelper;