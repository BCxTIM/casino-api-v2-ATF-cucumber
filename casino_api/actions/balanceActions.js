const requestActions = require('../requestActions');
const accountActions = require('./accountActions');
const shouldEqual    = require('../../utils/soft2BetAssert').shouldEqual;
const util           = require('util');

const log4js = require('log4js');
const logger = log4js.getLogger();

module.exports = {

    addBalance: async function (user, amount) {
        let url = "/gateway/v2/payment/deposit";

        let req = {
            "value"    : user.value,
            "amount"   : amount,
            "search_by": "login"
        };

        let response = await requestActions.send(req, url);

        logger.debug("Response HTTP Status Code: " + response.statusCode);
        logger.debug("Response Body: " + JSON.stringify(response.body));

        return response;
    },

    removeBalance: async function (user, amount) {
        let url = "/gateway/v2/payment/withdraw";

        let req = {
            "value"    : user.value,
            "amount"   : amount,
            "search_by": "login"
        };

        let response = await requestActions.send(req, url);

        logger.debug("Response HTTP Status Code: " + response.statusCode);
        logger.debug("Response Body: " + JSON.stringify(response.body));

        return response;

    },


    removeAllBalance: async function (user) {
        let url = "/gateway/v2/payment/withdraw";

        let account = await accountActions.getAccountInfoByUser(user);

        let req = {
            "value"    : user.value,
            "amount"   : account.body.result.balance,
            "search_by": "login"
        };

        let {body: {result: response}} = await requestActions.send(req, url).expect(200);
        shouldEqual(util.format("All balance for [%s] user is removed", user.value), parseInt(response.balance), 0);
    },

};