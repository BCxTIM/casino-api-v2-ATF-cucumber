module.exports = {

    validateExpectedResultFromResponse: async function (expectedResult, data) {
        await data.rows().should.deepEqual(expectedResult);
    },

    validateResponseAfterAddingBonus: async function (result, data) {

        let statusCode = data.rowsHash().statusCode;
        result.statusCode.should.equal(parseInt(statusCode));

        if (result.statusCode === 200) {
            let response = result.body.result;

            let amount = parseFloat(data.rowsHash().amount);
            let wager  = data.rowsHash().wager;

            response.bonus.rules.wager.should.equal(wager);
            response.bonus.rules.amount.should.equal(amount);

            response.bonus.data.amount.should.equal(amount);

            response.bonus.data.rollover.should.equal(amount * wager);
            response.bonus.data.rollover_init.should.equal(amount * wager);

        }
    },
};