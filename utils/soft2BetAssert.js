const should = require('should');
const log4js = require('log4js');
const logger = log4js.getLogger();

module.exports = {
    shouldEqual: async function (message, actualResult, expectedResult) {
        logger.debug(message);
        await should.equal(actualResult, expectedResult, message);
    },

    deepEqual: async function (message, actualResult, expectedResult) {
        logger.debug(message);
        await should.deepEqual(actualResult, expectedResult, message);
    }
};
