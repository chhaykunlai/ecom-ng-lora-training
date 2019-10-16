'use strict';

const server = require('*/utils/Server');

server.post('GetEstimationDate', getEstimationDate);

/**
 * Get estimation date from web service
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - next function
 */
function getEstimationDate(req, res, next) {
    const submitStatus = require('*/utils/JsonForm').getForm('deliveryestimationdate').submit(req.form);

    if (req.isAjax) {
        res.setStatusCode(submitStatus.success ? 200 : 400);
        submitStatus.custom.errorMessage = submitStatus.custom.message;
        res.json(submitStatus.custom);
    }
    next();
}

module.exports = server.exports();
