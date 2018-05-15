var users = {
    //valid users
    BCXTIMRUBTEST: {
        "provider"  : "softswiss",
        "user_id"   : "sw-1004546",
        "session_id": "sw-test-session-rub-100%",
        "currency"  : "RUB",
        "value"  : "BCXTIMRUBTEST"
    },
    BCXTIMEURTEST: {
        "provider"  : "softswiss",
        "user_id"   : "sw-1004547",
        "session_id": "sw-test-session-eur",
        "currency"  : "EUR",
        "value"  : "BCXTIMEURTEST"
    },

    1004546: {
           "provider"  : "softswiss",
           "user_id"   : "sw-1004546",
           "session_id": "sw-test-session-rub-100%",
           "currency"  : "RUB",
           "value"  : "1004546"
       },
    1004547: {
           "provider"  : "softswiss",
           "user_id"   : "sw-1004547",
           "session_id": "sw-test-session-eur",
           "currency"  : "EUR",
           "value"  : "1004547"
       },


    //Invalid users
    NON_EXISTING_USER: {
        "value"  : "NON_EXISTING_USER"
    },

    100454600000000: {
        "value" : 100454600000000
    }

};

module.exports = {
    getUserDataByName: async function (username) {
        return await users[username];
    },
    getAllUsernames  : function () {
        return Object.getOwnPropertyNames(users);
    },


};
