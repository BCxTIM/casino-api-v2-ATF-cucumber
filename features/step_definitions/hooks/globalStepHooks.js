const {defineSupportCode} = require('cucumber');
const bonusActions        = require('../../../casino_api/actions/bonusActions');
const balanceActions      = require('../../../casino_api/actions/balanceActions');
const userData            = require('../../../fixtures/userData');

const log4js = require('log4js');
const logger = log4js.getLogger();

defineSupportCode(function ({Before, After}) {

    After(async function () {
        logger.debug("Remove balance and bonus");
        userData.getAllUsernames().forEach(async function (username) {
            if (username.includes("BCX")) {
                let user  = await userData.getUserDataByName(username);
                let bonus = await bonusActions.getBonusByStatusAndUser('active', user);
                if (bonus.length > 0) {
                    await bonusActions.updateStatusBonus(bonus[0], 'canceled');
                }
                await balanceActions.removeAllBalance(user);
            }

        })
    });

    Before(async function (scenario) {
        global.scenarioDetails = function () {
            return scenario;
        };

        logger.info("Scenario name: " + scenario.pickle.name);

        scenario.pickle.steps.forEach(function (step) {
            logger.info("Step name: " + step.text);
        });

    });


});

