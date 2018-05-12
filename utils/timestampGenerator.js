const moment = require('moment');

module.exports = {
    getTimestamp: async function (pattern, format) {
        let timestamp;
        if (pattern.includes("now")) {
            timestamp = moment().utc().format(format);
        } else {
            let json  = JSON.parse(pattern);
            timestamp = moment().add(json).utc().format(format);

        }
        return await timestamp;
    },

};