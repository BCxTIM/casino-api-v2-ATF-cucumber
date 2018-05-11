const userData            = require('../../fixtures/userData');
const accountActions      = require('../../casino_api/actions/accountActions');
const balanceActions      = require('../../casino_api/actions/balanceActions');
const should              = require('should');
const {defineSupportCode} = require('cucumber');

defineSupportCode(function ({Given, Then, When}) {
    var account = {};

    Given(/^get account info for '(.*)' user$/, async function (username) {
        let user = await userData.getUserDataByUsername(username);

        account = await accountActions.getAccountInfoByUser(user);
    });

    Then(/^account info have the corresponding data for '(.*)' user$/, async function (username, data) {
        let user = await userData.getUserDataByUsername(username);
        account            = await accountActions.getAccountInfoByUser(user);

        let expectedResult = [
            ['balance', account.balance],
            ['amount', account.bonus.amount],
            ['rollover', account.bonus.rollover],
        ];

        await data.rows().should.deepEqual(expectedResult);
    });

    When(/^add amount (\d+.\d+) balance for '(.*)' user$/, async function (amount, username) {
        let user = await userData.getUserDataByUsername(username);
        await balanceActions.addBalance(user, amount);
    });

    When(/^remove balance (\d+) for '(.*)' user (true|false)$/, async function (amount, username, isRemoved) {
        let user = await userData.getUserDataByUsername(username);
        await balanceActions.removeBalance(user, amount, isRemoved);


    });

    When(/^remove all balance for '(.*)' user$/, async function (username) {
        let user = await userData.getUserDataByUsername(username);
        await balanceActions.removeAllBalance(user);
    });
});