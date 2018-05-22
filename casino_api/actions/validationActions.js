const util        = require('util');
const shouldEqual = require('../../utils/soft2BetAssert').shouldEqual;
const deepEqual   = require('../../utils/soft2BetAssert').deepEqual;

module.exports = {

    validateExpectedResultFromResponse: async function (expectedResult, data) {
        await deepEqual(util.format("Expected data [%s] is as actual data", JSON.stringify(expectedResult), JSON.stringify(data.rowsHash())), expectedResult, data.rowsHash());
    },

    validateResponseAfterAddingBonus: async function (result, data) {

        let statusCode = data.rowsHash().statusCode;
        shouldEqual(util.format("Response status code [%s] should equal [%s]", result.statusCode, statusCode), result.statusCode, parseInt(statusCode));


        if (result.statusCode === 200) {
            let response = result.body.result;

            let amount = parseFloat(data.rowsHash().amount);
            let wager  = data.rowsHash().wager;

            shouldEqual(util.format("Response bonus wager [%s] should equal [%s]", response.bonus.rules.wager, wager), response.bonus.rules.wager, wager);
            shouldEqual(util.format("Response bonus amount [%s] should equal [%s]", response.bonus.rules.amount, amount), response.bonus.rules.amount, amount);
            shouldEqual(util.format("Response bonus data amount [%s] should equal [%s]", response.bonus.data.amount, amount), response.bonus.data.amount, amount);
            shouldEqual(util.format("Response bonus data rollover [%s] should equal [%s]", response.bonus.data.rollover, (amount * wager)),
                response.bonus.data.rollover, (amount * wager));
            shouldEqual(util.format("Response bonus data rollover init [%s] should equal [%s]", response.bonus.data.rollover_init, (amount * wager)),
                response.bonus.data.rollover_init, (amount * wager));


        }
    },

    sizeReponseIs: async function (type, size) {
        await shouldEqual(type + " size is " + size, response.length, size);
    }
};