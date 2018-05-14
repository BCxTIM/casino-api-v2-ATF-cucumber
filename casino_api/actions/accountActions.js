const requestActions = require('../requestActions');
module.exports       = {

    getAccountInfoByUser: async function (user) {
        let req = {
            "value"    : user.username,
            "search_by": "login"
        };

        let url                       = "/gateway/v2/account/info";
        let {body: {result: account}} = await requestActions.send(req, url).expect(200);

        return account;
    },

    tryToGetAccountInfo: async function (field, username, isSuccess) {
            let req = {
                "value"    : username,
                "search_by": field
            };

            let url                       = "/gateway/v2/account/info";
            if(isSuccess.includes("true")) {
                await requestActions.send(req, url).expect(200);

            } else {
                let {body: response} = await requestActions.send(req, url).expect(400);
                response.errors[0].code.should.equal(5002);
                response.errors[0].message.should.equal("Account not found!");
            }

        }
};