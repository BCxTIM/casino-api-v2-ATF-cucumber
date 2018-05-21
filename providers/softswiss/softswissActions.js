const requestActions  = require('./requestActions');
const rolloverPersent = require('../../fixtures/rolloverAllowed');
const moment          = require('moment');
const util            = require('util');
const deepEqual       = require('../../utils/soft2BetAssert').deepEqual;

const log4js = require('log4js');
const logger = log4js.getLogger();


module.exports = {

    checkServerStatus: async function () {
        await requestActions.checkServiceStatus();
    },

    autorizeUser    : async function (user) {
        let req = {
            "session_id": user.value,
            "user_id"   : user.user_id,
            "currency"  : user.currency,
            "game"      : "amatic:BookOfAztec",
            "game_id"   : 1553793770,
            "finished"  : true,
            "actions"   : [
                {
                    "action"            : "rollback",
                    "action_id"         : "2080489990",
                    "original_action_id": "2080489987"

                }
            ]
        };

        let response = await requestActions.send(req);

        logger.debug("Response HTTP Status Code: " + response.statusCode);
        logger.debug("Response Body: " + JSON.stringify(response.body));
        return response;

    },
    getPlayerBalance: async function (userData, rolloverAllowed) {
        let session_id   = await this.getSessionIdByRolloverAllowed(userData, rolloverAllowed);
        let {body: user} = await requestActions.send({session_id: session_id}).expect(200);
        return user;
    },

    playerBalanceForRolloverAllowedIsFollowing: async function (userData, rolloverAllowed, balance) {

        let user = await this.getPlayerBalance(userData, rolloverAllowed);
        user.balance.should.equal(parseInt(balance.toString().replace('.', '')));
        return user;
    },

    betAction: async function (user, amount, rolloverAllowed) {
        let session_id = await this.getSessionIdByRolloverAllowed(user, rolloverAllowed);
        let betAmount  = await parseInt(amount.toString().replace('.', ''));

        let action_id = "" + moment().valueOf();

        return await requestActions.send({
            "session_id": session_id,
            "user_id"   : user.value,
            "currency"  : user.currency,
            "game"      : "amatic:BookOfAztec",
            "game_id"   : 1553793770,
            "finished"  : true,
            "action"    :
                {
                    "action": "bet",
                    action_id,
                    "amount": betAmount

                }

        });


    },

    getSessionIdByRolloverAllowed: async function (user, rollover_allowed) {
        let session_id = rollover_allowed;
        if (this.isEmpty(session_id) || this.isEmpty(rolloverPersent[rollover_allowed])) {
            session_id = user.session_id;
        } else {
            session_id = rolloverPersent[rollover_allowed];
        }
        return session_id;
    },

    isEmpty: function (value) {
        return typeof value == 'string' && ! value.trim() || typeof value == 'undefined' || value === null;
    }


};