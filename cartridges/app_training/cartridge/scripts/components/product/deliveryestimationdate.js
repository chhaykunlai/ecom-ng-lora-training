'use strict';

/**
 * product deliveryestimationdate component.
 * PLEASE ADD GENERAL COMPONENT PURPOSE AND USE CASES DESCRIPTION HERE.
 *
 * @module components/product/deliveryestimationdate
 */

/**
 * Creates the model for the view, all logic should happen here and the template
 * should only decorate the model properties and contains no logic
 * @param {String} pid - Product ID
 * @returns {Object} model for the view
 */
exports.createModel = function (pid) {
    const shippingDetailsProvider = require('providers').get('ShippingDetails');
    if (!shippingDetailsProvider.isEnabled() || shippingDetailsProvider.provider !== 'CanadaPost') {
        return { suppressRender: false };
    }

    if (!pid) {
        const currentProduct = require('*/helpers/Product').getCurrentProduct();
        if (currentProduct) {
            pid = currentProduct.getID();
        } else {
            return { suppressRender: false };
        }
    }

    const CSRFProtection = require('dw/web/CSRFProtection');
    const form = require('*/utils/JsonForm').getForm('deliveryestimationdate');
    form.getField('pid').setValue(pid);
    const toggleDataOptions = {
        target     : '[data-js-delivery-date-form]',
        classNames : {
            toggle: 'm-opened',
        },
    };
    var model = {
        componentName : 'product/DeliveryEstimationDate',
        text          : {
            deliveryDateTitle : this.resource('title'),
            deliveryDateEdit  : this.resource('button.edit'),
        },
        form             : form.getFormModel(),
        componentOptions : {
            urls: {
                getDeliveryEstimationDate: require('dw/web/URLUtils').https('Delivery-GetEstimationDate').toString(),
            },
        },
        csrf: {
            name  : CSRFProtection.getTokenName(),
            value : CSRFProtection.generateToken(),
        },
        toggleComponentName : 'global/Toggle',
        toggleDataOptions   : toggleDataOptions,
        cssClass            : '',
    };

    return model;
};

/**
 * Get estimation from post
 * @param {String} productId - product ID
 * @param {String} postalCode - postal code
 * @returns {Object} responseObject - Response object
 */
function getEstimate(productId, postalCode) {
    let responseObject = {
        success : false,
        message : require('*/utils/Resource').get('deliveryestimationdate.message.error', 'product'),
    };
    const defaultShippingMethodID = require('*/helpers/Basket').getBasketInstance().getDefaultShipment().shippingMethodID;
    const weightObject = getProductWeight(productId);
    let ratingObject = {
        success: false,
    };
    ratingObject = require('providers').get('ShippingDetails').getRatingInfo(postalCode, weightObject, defaultShippingMethodID);

    if (ratingObject.success) {
        postalCode = formatZip(postalCode);
        responseObject.success = true;
        responseObject.message = require('*/utils/Resource').get('deliveryestimationdate.message.success', 'product', ratingObject.expectedDeliveryDate, postalCode);
    }

    return responseObject;
}

/**
 * Gets product weight
 * @param {String} productId - Product ID
 * @returns {Object} - weight object
 */
function getProductWeight(productId) {
    let weightObject = {
        weight                    : 0,
        defaultWeightProductCount : 0,
    };
    const productHelper = require('*/helpers/Product');
    const product = productHelper.get(productId);

    if (empty(product.object)) {
        return weightObject;
    }

    let weight = product.getValue('dimWeight');

    // If no weight is set on the variation try to get the weight from the master
    if (empty(weight) && product.object.isVariant()) {
        const master = productHelper.get(product.getMasterProduct());

        weight = master.getValue('dimWeight');
    }

    if (empty(weight)) {
        weightObject.defaultWeightProductCount = 1;
    } else {
        weightObject.weight = weight;
    }

    return weightObject;
}

/**
 * Formats postal code
 * @param {String} zip - Postal code
 * @returns {String} - Formatted postal code
 */
function formatZip(zip) {
    const zipTest = /[0-9a-zA-Z]/;
    return zip.split('')
        .filter(function (char) {
            return zipTest.test(char);
        })
        .map(function (char, index) {
            var space = '';

            if (index === 2) {
                space = ' ';
            }

            return [char.toUpperCase(), space].join('');
        })
        .join('');
}

/** the template used to render the model */
exports.template = 'components/product/deliveryestimationdate.hbs';

exports.on = {
    /**
     * Handles submit form
     * @param {Object} event - event object
     */
    'deliveryestimationdate.submit': function (event) {
        const postalCode = event.form.object.postalcode;
        const productId = event.form.object.pid;

        event.form.custom = getEstimate(productId, postalCode);
    },
};
