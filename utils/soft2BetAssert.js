const should = require('should');
const log4js = require('log4js');
const logger = log4js.getLogger();

module.exports = {
    shouldEqual: function (message, actualResult, expectedResult) {
        logger.debug(message);
        should.equal(actualResult, expectedResult, message);
    },

    deepEqual: function (message, actualResult, expectedResult) {
        logger.debug(message);
        should.deepEqual(actualResult, expectedResult, message);
    }
};
