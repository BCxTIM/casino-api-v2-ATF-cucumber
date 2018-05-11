var users = {
    BCXTIMRUBTEST: {
        "provider"  : "softswiss",
        "user_id"   : "sw-1004546",
        "session_id": "sw-test-session-rub-100%",
        "currency"  : "RUB",
        "username"  : "BCXTIMRUBTEST"
    },
    BCXTIMEURTEST: {
        "provider"  : "softswiss",
        "user_id"   : "sw-1004547",
        "session_id": "sw-test-session-eur",
        "currency"  : "EUR",
        "username"  : "BCXTIMEURTEST"
    }

};

module.exports = {
    getUserDataByUsername: async function (username) {
        return await users[username];
    }

};
