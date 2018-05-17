const PropertiesReader = require('properties-reader');
require('dotenv').load();
const util   = require('util');
const log4js = require('log4js');


const moment  = require('moment');
let timestamp = moment().format("YYYY-MM-DD HH:MM:ss");

log4js.configure({
    appenders : {evidience: {type: 'file', filename: 'report/execution' + timestamp + '.log'}},
    categories: {default: {appenders: ['evidience'], level: 'debug'}}
});
const logger = log4js.getLogger();
logger.level = 'info';
logger.level = 'debug';


module.exports = (function () {
    let envUrl     = '';
    let properties = {};
    let enviroment = process.env.env;
    switch (enviroment) {
        case 'develop':
            properties = PropertiesReader('config/' + enviroment + '.properties');
            envUrl     = properties.get('dev.URL');
            break;
        default:
            throw new Error("Please define enviroment [env=develop, ...]");
    }
    logger.info(util.format("Context is up. Enviroment is [%s]", enviroment));

    const {get: getProperties} = properties;
    return {
        getEnvUrl: function () {
            return envUrl;
        },
        getProperties,
    }

}());