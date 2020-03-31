'use strict';

/**
 * global impactradius component.
 * PLEASE ADD GENERAL COMPONENT PURPOSE AND USE CASES DESCRIPTION HERE.
 *
 * @module components/global/impactradius
 */

/**
 * Creates the model for the view, all logic should happen here and the template
 * should only decorate the model properties and contains no logic
 * @param {String} type - Type of file uses
 * @returns {Object} model for the view
 */
exports.createModel = function (type) {
    var componentOptions = {
        url            : '//d.impactradius-event.com/A325808-a7c1-4ff9-b244-ea96680cace11.js',
        dataAttributes : {},
    };
    var CurrentCustomer = session.customer;
    componentOptions.type = type || '';
    componentOptions.additionalData = {
        customerEmail: CurrentCustomer.anonymous ? '' : sha1Encrypt(CurrentCustomer.profile.email),
    };
    if (type === 'call') {
        componentOptions.additionalData.customerId = CurrentCustomer.anonymous ? '' : CurrentCustomer.ID;
    } else if (type === 'trackconversation') {
        componentOptions.additionalData.trackerId = '10914';
        componentOptions.additionalData.status = CurrentCustomer.orderHistory.orderCount > 1 ? 'Returning' : 'New';
    }

    var model = {
        componentName    : 'global/ImpactRadius',
        componentOptions : componentOptions,
        cssClass         : ' ',
    };

    return model;
};

/**
 * Encypts email
 * @param {String} valueToEncrypt - email to encypt
 * @returns {String} encypted email
 */
function sha1Encrypt(valueToEncrypt) {
    const Bytes = require('dw/util/Bytes');
    const MessageDigest = require('dw/crypto/MessageDigest');
    const Encoding = require('dw/crypto/Encoding');
    const messageDigestSHA = new MessageDigest(MessageDigest.DIGEST_SHA_1);
    const shaString = Encoding.toHex(messageDigestSHA.digest(MessageDigest.DIGEST_SHA_1, new Bytes(valueToEncrypt)));
    return shaString;
}

/** the template used to render the model */
exports.template = 'components/global/impactradius.hbs';
