const {defineSupportCode} = require('cucumber');
const bonusActions        = require('../../../casino_api/actions/bonusActions');
const balanceActions      = require('../../../casino_api/actions/balanceActions');
const userData            = require('../../../fixtures/userData');


defineSupportCode(function ({After}) {

    After(async function () {
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

});
