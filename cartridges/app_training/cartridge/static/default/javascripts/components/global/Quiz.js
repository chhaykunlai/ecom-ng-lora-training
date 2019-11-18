import Component from 'core/Component';
import { on, off } from 'toolbox/event';

/**
 * This is a description of the Quiz constructor function.
 * @class
 * @classdesc This is a description of the Quiz class. (must be edited)
 * @extends Component
 */
export default class Quiz extends Component {
    /**
     * Constructor of the class that mainly merge the options of the components
     * @param {HTMLElement} element HTMLElement of the component
     * @param {Object} options options that belongs to the component
     */
    constructor(element, options = {}) {
        super(element, options);
    }

    /**
     * Init the different state of the component
     * It helps to avoid heavy DOM manipulation
     */
    initState() {
        // this.state.isActive = true
        // this.state.isLoading = true
    }

    /**
     * Should contain only event listeners and nothing else
     * All the event handlers should be into a separated function. No usage of anonyous function
     */
    bindEvents() {
        on('step.change', this.element, this.onStepChanged.bind(this), { customEvent: true });
    }

    /**
     * Display alert message
     * after clicking on step button
     */
    onStepChanged() {
        // eslint-disable-next-line no-alert
        alert('step change');
    }

    /**
     * Destroy is called automatically after the component is being removed from the DOM
     * You must always destroy the listeners attached to an element to avoid any memory leaks
     */
    destroy() {
        off('step.change', this.element);
    }
}
