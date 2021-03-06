const requestActions     = require('../requestActions');
const accountActions     = require('./accountActions');
const validationActions  = require('./validationActions');
const timestampGenerator = require('../../utils/timestampGenerator');
const shouldEqual        = require('../../utils/soft2BetAssert').shouldEqual;
const util               = require('util');

const log4js = require('log4js');
const logger = log4js.getLogger();


module.exports = {
    addBonus: async function (user, data) {
        logger.debug("Add bonus for " + user.value);


        let url = "/gateway/v2/payment/add_bonus";

        let amount = parseFloat(data.rowsHash().amount);
        let wager  = data.rowsHash().wager;
        let status = data.rowsHash().status;
        let expire = await timestampGenerator.getTimestamp(data.rowsHash().timestamp, data.rowsHash().format);

        let req = {
            "value"          : user.value,
            "amount"         : amount,
            "wager"          : wager,
            "status"         : status,
            "name"           : "No deposit bonus",
            "expire"         : expire,
            "type"           : "casino",
            "provider"       : null,
            "bonus_game_code": "",
            "bonusplanid"    : null,
            "deposit_amount" : 0,
            "search_by"      : "login"
        };

        let result = await requestActions.send(JSON.stringify(req), url);

        logger.debug("Response HTTP Status Code: " + result.statusCode);
        logger.debug("Response Body: " + JSON.stringify(result.body));

        await validationActions.validateResponseAfterAddingBonus(result, data);
        return result;

    },

    addFreeespin: async function (user, data) {

        logger.debug("Add freespin for " + user.value);


        let url = "/gateway/v2/payment/add_bonus";

        let amount = parseFloat(data.rowsHash().amount);
        let wager  = data.rowsHash().wager;
        let status = data.rowsHash().status;
        let expire = await timestampGenerator.getTimestamp(data.rowsHash().timestamp, data.rowsHash().format);

        let req = {
            "value"          : user.value,
            "amount"         : amount,
            "wager"          : wager,
            "status"         : status,
            "name"           : "No deposit bonus",
            "expire"         : expire,
            "type"           : "freespin",
            "game_id"        : 12172,
            "provider"       : null,
            "bonus_game_code": "",
            "bonusplanid"    : null,
            "deposit_amount" : 0,
            "search_by"      : "login"
        };

        let result = await requestActions.send(JSON.stringify(req), url);

        logger.debug("Response HTTP Status Code: " + result.statusCode);
        logger.debug("Response Body: " + JSON.stringify(result.body));

        await validationActions.validateResponseAfterAddingBonus(result, data);
        return result;

    },


    getBonusByStatusAndUser: async function (status, user) {
        logger.debug("Get bonus status by user  " + user.value);


        let start = await timestampGenerator.getTimestamp('now', 'YYYY-MM-DD');
        let end   = await timestampGenerator.getTimestamp('{"days": 1}', 'YYYY-MM-DD');

        let url = "/gateway/v2/payment/bonus_list";

        let req = {
            "login" : user.value,
            "status": status,
            "start" : start,
            "end"   : end
        };

        let result = await requestActions.send(JSON.stringify(req), url).expect(200);

        logger.debug("Response HTTP Status Code: " + result.statusCode);
        logger.debug("Response Body: " + JSON.stringify(result.body));

        let {body: {result: bonus}} = result;
        return bonus;
    },

    updateStatusBonus: async function (bonus, status) {
        logger.debug("Update status bonus " + bonus.bonus_id);

        let url      = "/gateway/v2/payment/update_bonus";
        let bonus_id = await bonus.bonus_id;

        let req = {
            "bonus_id": bonus_id,
            "status"  : status
        };

        let {body: {result: result}} = await requestActions.send(req, url).expect(200);

        shouldEqual(util.format('Response bonus id [%s] is equal to [%s]', result.bonus.bonus_id, bonus_id), result.bonus.bonus_id, bonus_id);
        shouldEqual(util.format('Response bonus status [%s] is equal to [%s]', result.bonus.status, status), result.bonus.status, status);


    },

    updateBonusWithError: async function (bonusId, status) {

        logger.debug("Update bonus with error " + bonusId);

        let url = "/gateway/v2/payment/update_bonus";

        let req    = {
            "bonus_id": bonusId,
            "status"  : status
        };
        let result = await requestActions.send(req, url);

        logger.debug("Response HTTP Status Code: " + result.statusCode);
        logger.debug("Response Body: " + JSON.stringify(result.body));

        return result;
    },

};