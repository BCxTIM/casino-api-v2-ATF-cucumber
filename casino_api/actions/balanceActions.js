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

        let {body: response} = await requestActions.send(req, url);
        await this.validateAddBalanceResponse(req, response);
    },

    validateAddBalanceResponse: async function (req, response) {
        if (req.amount < 0) {
            response.errors[0].code.should.equal(5005);
            response.errors[0].message.should.equal('Amount can\'t be less then zero!');
        } else {
            response.result.balance.should.equal(parseFloat(req.amount).toFixed(2));
        }

    },

    removeBalance: async function (user, amount, isRemoved) {
        let url     = "/gateway/v2/payment/withdraw";
        let account = await accountActions.getAccountInfoByUser(user);


        let req = {
            "value"    : user.username,
            "amount"   : amount,
            "search_by": "login"
        };

        let {body: result} = await requestActions.send(req, url);
        await this.validateRemoveResponseBalance(req, result, account, isRemoved);

    },

    validateRemoveResponseBalance: async function (req, result, account, isRemoved) {
        if (isRemoved.includes("true")) {
            result.result.balance.should.equal((account.balance - req.amount).toFixed(2));
        } else {
            if (req.amount < 0) {
                result.result.errors[0].code.should.equal(5005);
                result.result.errors[0].message.should.equal('Amount can\'t be less then zero!');
            }

            if (req.amount > account.balance) {
                result.errors[0].code.should.equal(5004);
                result.errors[0].message.should.equal("Not enough funds!");
            }
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