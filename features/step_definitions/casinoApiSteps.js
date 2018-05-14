const userData            = require('../../fixtures/userData');
const accountActions      = require('../../casino_api/actions/accountActions');
const balanceActions      = require('../../casino_api/actions/balanceActions');
const bonusctions         = require('../../casino_api/actions/bonusActions');
const should              = require('should');
const {defineSupportCode} = require('cucumber');

defineSupportCode(function ({Given, Then, When}) {
    var account = {};
    var bonus;

    Given(/^get account info for '(.*)' user$/, async function (username) {
        let user = await userData.getUserDataByUsername(username);

        account = await accountActions.getAccountInfoByUser(user);
    });

    Then(/^try to get account info by (.*) for (.*) (true|false)$/, async function(field, username, isSuccess) {
        account = await accountActions.tryToGetAccountInfo(field, username, isSuccess);
    });

    Then(/^account info have the corresponding data for '(.*)' user$/, async function (username, data) {
        let user = await userData.getUserDataByUsername(username);
        account  = await accountActions.getAccountInfoByUser(user);

        let expectedResult = [
            ['balance', account.balance],
            ['amount', account.bonus.amount],
            ['rollover', account.bonus.rollover],
        ];

        await data.rows().should.deepEqual(expectedResult);
    });

    When(/^add amount (-?\d+.\d+) balance for '(.*)' user$/, async function (amount, username) {
        let user = await userData.getUserDataByUsername(username);
        await balanceActions.addBalance(user, amount);
    });

    When(/^remove balance (-?\d+.\d+) for '(.*)' user (true|false)$/, async function (amount, username, isRemoved) {
        let user = await userData.getUserDataByUsername(username);
        await balanceActions.removeBalance(user, amount, isRemoved);
    });

    When(/^remove all balance for '(.*)' user$/, async function (username) {
        let user = await userData.getUserDataByUsername(username);
        await balanceActions.removeAllBalance(user);
    });

    Given(/^add bonus for '(.*)' user with bellow data$/, async function (username, data) {
        let user = await userData.getUserDataByUsername(username);
        await bonusctions.addBonus(user, data);
    });

    When(/^get '(.*)' bonus from bonus list for '(.*)' user$/, async function (status, username) {
        let user = await userData.getUserDataByUsername(username);
        bonus    = await bonusctions.getBonusByStatusAndUser(status, user);
    });

    Then(/^update '(.*)' bonus with new status '(.*)' for '(.*)' user$/, async function (existingStatus, expectedStatus, username) {
        let user = await userData.getUserDataByUsername(username);
        bonus    = await bonusctions.getBonusByStatusAndUser(existingStatus, user);
        await bonusctions.updateStatusBonus(bonus[0], expectedStatus);
    });

});