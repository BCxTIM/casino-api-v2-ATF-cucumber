const crypto           = require('crypto');
const supertest        = require("supertest");
const uuid             = require('uuid');
const context          = require('../../config/context');
const PropertiesReader = require('properties-reader');
const shouldEqual      = require('../../utils/soft2BetAssert').shouldEqual;

const log4js = require('log4js');
const logger = log4js.getLogger();


const agent = supertest.agent(context.getGameUrl());


module.exports = {

    send: function (req) {
        logger.debug("Request: ", req);

        return agent
            .post("/malina/play")
            .set('content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-forwarded-for', '37.24.158.43')
            .set('x-request-sign', this.getAuthSign(req))
            .set('x-request-id', this.uuid())
            .send(req).expect("Content-type", /json/);
    },


    getAuthSign: async function (data) {
        const hmac = crypto.createHmac('sha256', this.getToken());
        hmac.update(JSON.stringify(data));
        return hmac.digest('hex');
    },


    uuid: function () {
        return uuid();
    },

    checkServiceStatus: async function () {
        let res = await agent.get("/").expect("Content-type", /json/).expect(200);
        shouldEqual("Check if SOFTSWISS Callback API v2.0 is running", res.body.status, "SOFTSWISS Game Callback API v2.0 runnig...")
    },

    getToken: function () {
        let properties = PropertiesReader('config/softswiss.properties');
        return properties.get('auth.token');
    },


};
