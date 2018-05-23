const softswissActions = require('../../../providers/softswiss/softswissActions');
const userData         = require('../../../fixtures/userData');


const {defineSupportCode} = require('cucumber');

defineSupportCode(function ({Given, Then, When}) {

    Given(/^check if Softswiss Callback API v2.0 is running$/, async function () {
        await softswissActions.checkServerStatus();
    });
    When(/^authorization for '(.*)' user with sign is not valid$/, async function (name) {
        let user = await userData.getUserDataByName(name);

        response = await softswissActions.autorizeUser(user);

    });
    Then(/^player balance for '(.*)' user is following for rollover allowed (\d+)% is (\d+.\d+)$/, async function (name, rolloverAllowed, balance) {
        let user = await userData.getUserDataByName(name);
        response = await softswissActions.playerBalanceForRolloverAllowedIsFollowing(user, rolloverAllowed, balance);

    });

    When(/^user '(.*)' bet (\d+.\d+) amount with rollover allowed (\d+)%$/, async function (name, amount, rolloverAllowed) {
        let user = await userData.getUserDataByName(name);

        response = await softswissActions.betAction(user, amount, rolloverAllowed);

    });

    When(/^user '(.*)' bet (\d+.\d+) and win (\d+.\d+) amount with rollover allowed (\d+)%$/, async function (name, bet, win, rolloverAllowed) {
        let user = await userData.getUserDataByName(name);
        response = await softswissActions.betWinAction(user, bet, win, rolloverAllowed);

    });

    When(/^system rollback last action for '(.*)' user$/, async function (name) {
        let user = await userData.getUserDataByName(name);
        response = await softswissActions.rollbackLastAction(user);
    });
    When(/^win (\d+.\d+) for last bet action for '(.*)' user$/, async function (amount, name) {
        let user = await userData.getUserDataByName(name);
        response = await softswissActions.winForLastBet(user, amount);

    });
});