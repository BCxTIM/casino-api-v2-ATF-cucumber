const requestActions  = require('./requestActions');
const rolloverPersent = require('../../fixtures/rolloverAllowed');
const moment          = require('moment');
const util            = require('util');
const deepEqual       = require('../../utils/soft2BetAssert').deepEqual;
const Utils           = require('../../utils/utils');
const _               = require('lodash');

const log4js = require('log4js');
const logger = log4js.getLogger();


module.exports = {

    checkServerStatus: async function () {
        await requestActions.checkServiceStatus();
    },

    autorizeUser: async function (user) {
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


    betAction: async function (user, amount, rolloverAllowed) {
        let session_id = await this.getSessionIdByRolloverAllowed(user, rolloverAllowed);
        let betAmount  = await Utils.convertDoubleToCents(amount);

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

    betWinAction: async function (user, bet, win, rolloverAllowed) {

        let session_id = await this.getSessionIdByRolloverAllowed(user, rolloverAllowed);

        let bet_action_id = "" + moment().valueOf();
        let win_action_id = "" + (moment().valueOf() + 1);
        let round_id      = "" + (moment().valueOf() + 2);

        let betAmount = await Utils.convertDoubleToCents(bet);
        let winAmount = await Utils.convertDoubleToCents(win);


        return await requestActions.send({
            "session_id": session_id,
            "user_id"   : user.value,
            "currency"  : user.currency,
            "game"      : "amatic:BookOfAztec",
            "game_id"   : round_id,
            "finished"  : true,
            "actions"   : [
                {
                    "action" : "bet",
                    action_id: bet_action_id,
                    amount   : betAmount

                }, {
                    "action" : "win",
                    action_id: win_action_id,
                    amount   : winAmount
                }
            ]

        });
    },

    rollbackLastAction: async function (user) {
        let session_id = await this.getSessionIdByRolloverAllowed(user);
        let action_id  = await response.body.transactions.pop().action_id;

        return await requestActions.send({
            "session_id": session_id,
            "user_id"   : user.value,
            "currency"  : user.currency,
            "game"      : "amatic:BookOfAztec",
            "game_id"   : 1553793770,
            "finished"  : true,
            "actions"   : [
                {
                    action            : "rollback",
                    action_id         : action_id + 1,
                    original_action_id: action_id,
                }
            ]

        });

    },

    winForLastBet: async function (user, amount) {
        let session_id = await this.getSessionIdByRolloverAllowed(user);

        let action_id = "" + moment().valueOf();
        let winAmount = await Utils.convertDoubleToCents(amount);

        return await requestActions.send({
            "session_id": session_id,
            "user_id"   : user.value,
            "currency"  : user.currency,
            "game"      : "amatic:BookOfAztec",
            "game_id"   : response.body.game_id,
            "finished"  : true,
            "action"    :
                {
                    "action": "win",
                    action_id,
                    amount  : winAmount

                }

        });


    },

    getPlayerBalance: async function (userData, rolloverAllowed) {
        let session_id   = await this.getSessionIdByRolloverAllowed(userData, rolloverAllowed);
        let {body: user} = await requestActions.send({session_id: session_id}).expect(200);
        return user;
    },

    playerBalanceForRolloverAllowedIsFollowing: async function (userData, rolloverAllowed, balance) {

        let user = await this.getPlayerBalance(userData, rolloverAllowed);
        user.balance.should.equal(await Utils.convertDoubleToCents(balance));
        return user;
    },

    getSessionIdByRolloverAllowed: async function (user, rollover_allowed) {
        let session_id = rollover_allowed;
        let condition  = Utils.isEmpty(session_id) || Utils.isEmpty(rolloverPersent[rollover_allowed]);
        if (condition) {
            session_id = user.session_id;
        } else {
            session_id = rolloverPersent[rollover_allowed];
        }
        return session_id;
    },


};