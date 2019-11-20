import Component from 'core/Component';
import { on, trigger } from 'toolbox/event';
import { deepMerge } from 'toolbox/deepMerge';

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
        super(element, deepMerge({
            activeClass: 'm-secondary',
            deactiveClass: 'm-primary',
        }, options));
    }

    /**
     * Init the different state of the component
     * It helps to avoid heavy DOM manipulation
     */
    initState() {
        this.state.nextActiveIndex = 0;
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

    /**
     * Activate next button after previous one is clicked
     * all buttons will be disabled in case of last button
     * is clicked
     */
    activateNextButton() {
        const { activeClass, deactiveClass } = this.options;
        this.selectors.stepButtons.forEach((button, index) => {
            if (button.classList.contains(activeClass)) {
                this.state.nextActiveIndex = index + 1;
                button.classList.remove(activeClass);
                button.classList.add(deactiveClass);
            }
            const isActive = ((this.state.nextActiveIndex === index)
                && (this.state.nextActiveIndex < this.selectors.stepButtons.length));
            if (isActive) {
                button.classList.remove(deactiveClass);
                button.classList.add(activeClass);
            }
            button.disabled = !isActive;
        });
    }

    /**
     * This hook is used for any action that should be performed after the component init
     */
    afterInit() {
        const { activeClass, deactiveClass } = this.options;
        this.selectors.stepButtons.forEach((button, index) => {
            button.classList.add('c-button', index === 0 ? activeClass : deactiveClass);
            button.disabled = (index !== 0);
        });
    }
}
