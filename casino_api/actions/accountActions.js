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
    }
};