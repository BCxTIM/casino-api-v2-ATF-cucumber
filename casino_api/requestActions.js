const sign_token = "7t3jvnyG2mpmy96VqTBKkK4zrbnekU5s";
const context = require('../config/context');
const supertest  = require("supertest");
const agent      = supertest.agent(context.getEnvUrl());

module.exports = {

    send: function (req, url) {
        return agent
            .post(url)
            .set('content-type', 'application/json')
            .set('Sign', sign_token)
            .set('domain', 'alfcasino.com')
            .set('Referer', 'alfcasino.com')
            .set('Origin', 'alfcasino.com')
            .send(req).expect("Content-type", /json/);
    },
};
