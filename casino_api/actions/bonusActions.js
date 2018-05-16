const requestActions     = require('../requestActions');
const accountActions     = require('./accountActions');
const validationActions  = require('./validationActions');
const timestampGenerator = require('../../utils/timestampGenerator');
const should             = require("should");

module.exports = {
    addBonus: async function (user, data) {

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
        await validationActions.validateResponseAfterAddingBonus(result, data);
        return result;

    },

    addFreeespin: async function (user, data) {

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
        await validationActions.validateResponseAfterAddingBonus(result, data);
        return result;

    },


    getBonusByStatusAndUser: async function (status, user) {
        let start = await timestampGenerator.getTimestamp('now', 'YYYY-MM-DD');
        let end   = await timestampGenerator.getTimestamp('{"days": 1}', 'YYYY-MM-DD');

        let url = "/gateway/v2/payment/bonus_list";

        let req = {
            "login" : user.value,
            "status": status,
            "start" : start,
            "end"   : end
        };

        let {body: {result: bonus}} = await requestActions.send(JSON.stringify(req), url).expect(200);
        return bonus;
    },

    updateStatusBonus: async function (bonus, status) {
        let url      = "/gateway/v2/payment/update_bonus";
        let bonus_id = await bonus.bonus_id;

        let req = {
            "bonus_id": bonus_id,
            "status"  : status
        };

        let {body: {result: response}} = await requestActions.send(req, url).expect(200);

        response.bonus.bonus_id.should.equal(bonus_id);
        response.bonus.status.should.equal(status);

    },

    updateBonusWithError: async function (bonusId, status) {
        let url = "/gateway/v2/payment/update_bonus";

        let req = {
            "bonus_id": bonusId,
            "status"  : status
        };
        return await requestActions.send(req, url);
    },

};