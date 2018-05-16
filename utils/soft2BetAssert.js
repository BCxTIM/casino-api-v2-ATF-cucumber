const should = require('should');

module.exports = {
    shouldEqual: function (message, actualResult, expectedResult) {
        console.log(message);
        //TODO add logger
        should.equal(actualResult, expectedResult, message);
    },

    deepEqual: function (message, actualResult, expectedResult) {
        //TODO add logger
        console.log(message);
        should.deepEqual(actualResult, expectedResult, message);
    }
};
