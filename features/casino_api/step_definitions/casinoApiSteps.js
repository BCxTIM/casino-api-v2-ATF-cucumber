const userData          = require('../../../fixtures/userData');
const accountActions    = require('../../../casino_api/actions/accountActions');
const balanceActions    = require('../../../casino_api/actions/balanceActions');
const bonusActions      = require('../../../casino_api/actions/bonusActions');
const validationActions = require('../../../casino_api/actions/validationActions');
const generationActions = require('../../../utils/generationActions');

const {defineSupportCode} = require('cucumber');

defineSupportCode(function ({Given, Then, When}) {
    let bonus;


    Given(/^get (valid|invalid) account info for '(.*)' user by '(.*)'$/, async function (isValid, name, field) {
        let user = await userData.getUserDataByName(name);

        response = await accountActions.getAccountInfoByUser(user, field);
    });


    Then(/^account info have the corresponding data for user$/, async function (data) {
        let expectedResult = await generationActions.generateResponseExpectedData(data);
        await validationActions.validateExpectedResultFromResponse(expectedResult, data);
    });

    When(/^add amount (-?\d+.\d+) balance for '(.*)' user$/, async function (amount, username) {
        let user = await userData.getUserDataByName(username);
        response = await balanceActions.addBalance(user, amount);

    });

    When(/^remove balance (-?\d+.\d+) for '(.*)' user$/, async function (amount, username) {
        let user = await userData.getUserDataByName(username);
        response = await balanceActions.removeBalance(user, amount);
    });

    When(/^remove all balance for '(.*)' user$/, async function (username) {
        let user = await userData.getUserDataByName(username);
        await balanceActions.removeAllBalance(user);
    });

    Given(/^add (freespin|bonus) for '(.*)' user with bellow data$/, async function (type, username, data) {
        let user = await userData.getUserDataByName(username);
        if (type.includes("freespin")) {
            response = await bonusActions.addFreeespin(user, data);
        } else {
            response = await bonusActions.addBonus(user, data);
        }
    });

    When(/^get '(.*)' bonus from bonus list for '(.*)' user$/, async function (status, username) {
        let user = await userData.getUserDataByName(username);
        response = await bonusActions.getBonusByStatusAndUser(status, user);
    });

    When(/^update '(.*)' bonus with new status '(.*)' for '(.*)' user$/, async function (existingStatus, expectedStatus, username) {
        let user = await userData.getUserDataByName(username);
        bonus    = await bonusActions.getBonusByStatusAndUser(existingStatus, user);
        await bonusActions.updateStatusBonus(bonus[0], expectedStatus);
    });

    When(/^update not exisging bonus by id (\d+) to '(.*)'$/, async function (bonusId, status) {
        response = await bonusActions.updateBonusWithError(bonusId, status);
    });

    When(/^update exisging bonus by id (\d+) to not valid '(.*)' status$/, async function (bonusId, status) {
        response = await bonusActions.updateBonusWithError(bonusId, status);
    });

    Then(/^get corresponding response error code and message$/, async function (data) {
        let expectedResult = await generationActions.generateResponseExpectedData(data);
        await validationActions.validateExpectedResultFromResponse(expectedResult, data);
    });

    When(/^corresponding response is$/, async function (data) {
        let expectedResult = await generationActions.generateResponseExpectedData(data);
        await validationActions.validateExpectedResultFromResponse(expectedResult, data);
    });


    Given(/^(bonus|response|freespin) size is (\d+)$/, async function (type, size) {
        await validationActions.sizeReponseIs(type, size);
    });
});