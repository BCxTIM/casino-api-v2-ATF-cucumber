const _ = require('lodash');

module.exports = {

    generateResponseExpectedData: async function (data) {
        const data_hash = data.rowsHash();
        let result      = {};
        await Object.keys(data_hash).map((key) => {
            const response_result = _.get(response, key, false);
            if (response_result) {
                let temp = response_result;
                if (key === 'statusCode') {
                    temp = response_result.toString();
                } else if (key === 'body.errors[0].code') {
                    temp = response_result.toString();
                } else if (key === 'body.code') {
                    temp = response_result.toString();
                } else if (Number.isInteger(response_result)) {
                    temp = (response_result / 100).toFixed(2);
                }
                result[key] = temp;

            }
        });
        return result;
    },
};
