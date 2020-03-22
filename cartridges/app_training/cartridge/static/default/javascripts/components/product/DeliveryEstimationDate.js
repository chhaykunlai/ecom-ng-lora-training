import Form from 'components/global/Form';
import { deepMerge } from 'toolbox/deepMerge';
// import { on, off, trigger } from 'toolbox/event';

/**
 * This is a description of the DeliveryEstimationDate constructor function.
 * @class
 * @classdesc This is a description of the DeliveryEstimationDate class. (must be edited)
 * @extends Form
 */
export default class DeliveryEstimationDate extends Form {
    /**
     * Constructor of the class that mainly merge the options of the components
     * @param {HTMLElement} element HTMLElement of the component
     * @param {Object} options options that belongs to the component
     */
    constructor(element, options = {}) {
        super(element, deepMerge({
            templateName: 'product/deliveryestimationdate',
            classNames: {
                open: 'm-opened',
                success: 'm-submit-success',
            },
        }, options));
    }

    /**
     * All selectors must be cached. Never cache elements that are out of the component scope
     */
    initCache() {
        super.initCache();
        this.selectors.deliveryDateMessage = this.element.querySelector('[data-js-delivery-date-message]');
    }

    /**
     * Submit Success event handler
     *
     * @param {String} response Data
     */
    onSubmitSuccess(response) {
        super.onSubmitSuccess();

        if (response.success && response.message) {
            this.element.classList.remove(this.options.classNames.open);
            this.element.classList.add(this.options.classNames.success);
            this.selectors.deliveryDateMessage.innerHTML = response.message;
        }
    }
}
