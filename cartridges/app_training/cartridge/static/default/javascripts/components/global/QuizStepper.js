import Component from 'core/Component';
import { on, trigger } from 'toolbox/event';

/**
 * This is a description of the QuizStepper constructor function.
 * @class
 * @classdesc This is a description of the QuizStepper class. (must be edited)
 * @extends Component
 */
export default class QuizStepper extends Component {
    /**
     * Constructor of the class that mainly merge the options of the components
     * @param {HTMLElement} element HTMLElement of the component
     * @param {Object} options options that belongs to the component
     */
    constructor(element, options = {}) {
        super(element, options);
    }

    /**
     * All selectors must be cached. Never cache elements that are out of the component scope
     */
    initCache() {
        this.selectors.stepButtons = this.element.querySelectorAll('button');
    }

    /**
     * Should contain only event listeners and nothing else
     * All the event handlers should be into a separated function. No usage of anonyous function
     */
    bindEvents() {
        on('click', this.selectors.stepButtons, this.onClick.bind(this));
    }

    /**
     * Click step button
     */
    onClick() {
        trigger('step.change', this.element, { bubbles: true });
    }
}
