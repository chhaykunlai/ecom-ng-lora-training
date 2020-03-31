import ThirdPartyLoader from 'components/global/ThirdPartyLoader';
import DataLayer from 'services/DataLayer';

/**
 * This is a description of the ImpactRadius constructor function.
 * @class
 * @classdesc This is a description of the ImpactRadius class. (must be edited)
 * @extends ThirdPartyLoader
 */
export default class ImpactRadius extends ThirdPartyLoader {
    /**
     * Constructor of the class that mainly merge the options of the components
     * @param {HTMLElement} element HTMLElement of the component
     * @param {Object} options options that belongs to the component
     */
    constructor(element, options = {}) {
        super(element, options);
    }

    /**
     * Before load script
     * @returns {Boolean} callback result
     */
    onBeforeScriptLoad() {
        this.initalizeCustomScript({
            a: this.options.url,
            b: 'script',
            c: 'ire',
            d: document,
            e: window,
        });
        if (this.options.type === 'call' && typeof window.ire === 'function') {
            window.ire('identify', {
                customerId: this.options.additionalData.customerId,
                customerEmail: this.options.additionalData.customerEmail,
            });
        } else if (this.options.type === 'trackconversation' && typeof window.ire === 'function') {
            const { order, customer } = DataLayer.getData();
            const { customerEmail, trackerId, status } = this.options.additionalData;
            customer.email = customer.loggedIn ? customerEmail : '';
            customer.status = customer.loggedIn ? status : 'New';
            const trackConversion = this.trackConversionObject(order, customer);
            window.ire('trackConversion', trackerId, trackConversion, { verifySiteDefinitionMatch: true });
        }
        return true;
    }

    /**
     * Initialize custom script for adding script
     * @param {Object} obj - Object
     */
    initalizeCustomScript(obj) {
        obj.e.ire_o = obj.c;
        obj.e[obj.c] = obj.e[obj.c] || function defineIre(...args) {
            (obj.e[obj.c][obj.a] = obj.e[obj.c][obj.a] || []).push(args);
        };
        obj.f = obj.d.createElement(obj.b);
        const [childTagName] = obj.d.getElementsByTagName(obj.b);
        obj.g = childTagName;
        obj.f.async = 1;
        obj.f.src = obj.a;
        obj.g.parentNode.insertBefore(obj.f, obj.g);
    }

    /**
     * Gets tracking conversation object
     * @param {Object} order - Order object
     * @param {Object} customer - Customer object
     * @returns {String} - trackConversion json stringify
     */
    trackConversionObject(order, customer) {
        const merchandizeTotalNetPrice = order.merchandizeTotalNetPrice || 0;
        const adjustedMerchandizeTotalPrice = order.adjustedMerchandizeTotalPrice || 0;
        const orderDiscount = merchandizeTotalNetPrice - adjustedMerchandizeTotalPrice;
        let promoCode = '';
        if (order.promoCodes.length) {
            [promoCode] = order.promoCodes;
        }

        const products = order.products.reduce((acc, value) => {
            if (Object.keys(value).length) {
                value.name = value.name.replace(/'/g, '"');
            }
            acc.push(value);
            return acc;
        }, []);

        const trackConversion = JSON.stringify({
            orderId: order.orderNo,
            customerId: customer.loggedIn ? customer.id : '',
            customerEmail: customer.email,
            customerStatus: customer.status,
            orderPromoCode: promoCode,
            orderDiscount,
            currencyCode: order.currency,
            items: products,
        }).replace(/"/g, "'");

        return trackConversion;
    }
}
