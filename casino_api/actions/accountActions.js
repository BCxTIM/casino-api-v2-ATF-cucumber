const requestActions = require('../requestActions');
module.exports       = {

    getAccountInfoByUser: async function (user, field) {
        let req = {
            "value"    : user.value.toString(),
            "search_by": field
        };

        let url                       = "/gateway/v2/account/info";
        return await requestActions.send(req, url);

    },
};