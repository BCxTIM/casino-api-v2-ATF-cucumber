const PropertiesReader = require('properties-reader');
require('dotenv').load();


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

    const {get: getProperties} = properties;
    return {
        getEnvUrl: function () {
            return envUrl;
        },
        getProperties,
    }

}());