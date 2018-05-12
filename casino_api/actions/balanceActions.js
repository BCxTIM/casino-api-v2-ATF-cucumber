const requestActions = require('../requestActions');
const accountActions = require('./accountActions');
const should         = require("should");

module.exports = {

    addBalance: async function (user, amount) {
        let url = "/gateway/v2/payment/deposit";

        let req = {
            "value"    : user.username,
            "amount"   : amount,
            "search_by": "login"
        };

        let {body: {result: response}} = await requestActions.send(req, url).expect(200);
        response.balance.should.equal(parseFloat(amount).toFixed(2));
    },

    removeBalance: async function (user, amount, isRemoved) {
        let url     = "/gateway/v2/payment/withdraw";
        let account = await accountActions.getAccountInfoByUser(user);


        let req = {
            "value"    : user.username,
            "amount"   : amount,
            "search_by": "login"
        };

        if (isRemoved.includes("true")) {
            let {body: response} = await requestActions.send(req, url).expect(200);

            response.result.balance.should.equal((account.balance - amount).toFixed(2));
        } else {
            let {body: response} = await requestActions.send(req, url).expect(400);

            response.errors[0].code.should.equal(5004);
            response.errors[0].message.should.equal("Not enough funds!");
        }

    },

    removeAllBalance: async function (user) {
        let url = "/gateway/v2/payment/withdraw";

        let account = await accountActions.getAccountInfoByUser(user);

        let req = {
            "value"    : user.username,
            "amount"   : account.balance,
            "search_by": "login"
        };

        let {body: {result: response}} = await requestActions.send(req, url).expect(200);
        parseInt(response.balance).should.equal(0);
    },

};