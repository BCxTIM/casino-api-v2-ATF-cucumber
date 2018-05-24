const {defineSupportCode} = require('cucumber');
const bonusActions        = require('../../casino_api/actions/bonusActions');
const balanceActions      = require('../../casino_api/actions/balanceActions');
const userData            = require('../../fixtures/userData');

const log4js = require('log4js');
const logger = log4js.getLogger();

defineSupportCode(function ({Before, After, setDefaultTimeout}) {
    setDefaultTimeout(20 * 1000);

    global.response = {};

    After(async function () {
        logger.debug("Remove balance and bonus");

        const users = userData.getAllUsernames();

        for (let i = 0; i < users.length; i ++) {
            let username = users[i];
            if (username.includes("BCX")) {
                try {
                    await removeBalanceAndBonus(username);
                } catch (e) {
                    console.error(e);
                }
            }
        }

    });

    Before(async function (scenario) {
        global.scenarioDetails = function () {
            return scenario;
        };

        logger.info("Scenario name: " + scenario.pickle.name);
        console.log("\nScenario name: " + scenario.pickle.name);

        scenario.pickle.steps.forEach(function (step) {
            logger.info("Step name: " + step.text);
        });

    });


});

async function removeBalanceAndBonus(username) {
    return new Promise(async (resolve, reject) => {
        let user  = await userData.getUserDataByName(username);
        let bonus = await bonusActions.getBonusByStatusAndUser('active', user);
        if (bonus.length > 0) {
            await bonusActions.updateStatusBonus(bonus[0], 'canceled').catch(reject);
        }
        await balanceActions.removeAllBalance(user).catch(reject);
        resolve(true);

    })

}