'use strict';

/**
 * Quiz controller for showing quiz page
 */

const server = require('*/utils/Server');

server.get('Show', Show);

/**
 * Show quiz page
 * @param {Object} req - Request object
 * @param {Object} res - Request object
 * @param {Function} next - next function
 */
function Show(req, res, next) {
    const data = {
        registry: require('*/utils/Registry'),
    };
    res.render('containers/quiz', data);
    next();
}

module.exports = server.exports();
