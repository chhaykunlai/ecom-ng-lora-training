'use strict';

const CustomerMgr = require('dw/customer/CustomerMgr');

/**
 * Saves custom BeautyID on customer profile
 * from vlv cookie
 * @param {Object} form 
 */
function saveUniversalTrackingCookie(form) {
    let profile = null;
    if (!form) {
        const currentCustomer = session.customer;
        profile = currentCustomer.authenticated ? currentCustomer.profile : null;
    } else {
        const email = form.getField('email').getValue();
        if (email) {
            profile = CustomerMgr.searchProfile("email = {0}", email);
        }
    }

    if (profile) {
        profile.custom.BeautyId = require('*/utils/Cookie').getCookie('vlv');		
    }
}

exports.on = {
    'newslettersignup.submit.success': saveUniversalTrackingCookie,
    'login.successful': saveUniversalTrackingCookie,
};
