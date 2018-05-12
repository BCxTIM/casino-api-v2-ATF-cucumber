const requestActions     = require('../requestActions');
const accountActions     = require('./accountActions');
const timestampGenerator = require('../../utils/timestampGenerator');
const should             = require("should");

module.exports = {
    addBonus: async function (user, data) {

        let url = "/gateway/v2/payment/add_bonus";

        let amount       = parseFloat(data.rowsHash().amount);
        let wager        = data.rowsHash().wager;
        let status       = data.rowsHash().status;
        let responseCode = data.rowsHash().response_code;
        let expire       = await timestampGenerator.getTimestamp(data.rowsHash().timestamp, data.rowsHash().format);

        let req = {
            "value"          : user.username,
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

        let {body: result} = await requestActions.send(JSON.stringify(req), url).expect(parseInt(responseCode));
        await this.validateResponseAfterAddingBonus(result, data);

    },

    validateResponseAfterAddingBonus: async function (result, data) {
        let responseCode = await data.rowsHash().response_code;
        let amount       = parseFloat(data.rowsHash().amount);
        let wager        = data.rowsHash().wager;


        if (parseInt(responseCode) === 200) {
            let {result: response} = await result;

            response.bonus.rules.wager.should.equal(wager);
            response.bonus.rules.amount.should.equal(amount);

            response.bonus.data.amount.should.equal(amount);

            response.bonus.data.rollover.should.equal(amount * wager);
            response.bonus.data.rollover_init.should.equal(amount * wager);
        } else {
            let {errors: response} = await result;
            if (amount < 0) {
                response[0].code.should.equal(5005);
                response[0].message.should.equal('Account can\'t be less then zero!');
                //TODO should be Amount in message
            }
            if (wager < 0) {
                response[0].code.should.equal(5005);
                response[0].message.should.equal('Wager can\'t be less then zero!');
            }
        }


    },

    getBonusByStatusAndUser: async function (status, user) {
        let start = await timestampGenerator.getTimestamp('now', 'YYYY-MM-DD');
        let end   = await timestampGenerator.getTimestamp('{"days": 1}', 'YYYY-MM-DD');

        let url = "/gateway/v2/payment/bonus_list";

        let req = {
            "login" : user.username,
            "status": status,
            "start" : start,
            "end"   : end
        };

        let {body: {result: bonus}} = await requestActions.send(JSON.stringify(req), url).expect(200);
        return bonus;
    },

    updateStatusBonus: async function (bonus, status) {
        let url      = "/gateway/v2/payment/update_bonus";
        let bonus_id = bonus.bonus_id;

        let req = {
            "bonus_id": bonus_id,
            "status"  : status
        };

        let {body: {result: response}} = await requestActions.send(req, url).expect(200);

        response.bonus.bonus_id.should.equal(bonus_id);
        response.bonus.status.should.equal(status);

    },
};