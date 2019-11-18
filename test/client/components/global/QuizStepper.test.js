import { chai, sinon, testHelpers } from 'lora-cli';
const { expect } = chai;
const {
    mockEvents, importModule, mockModule, getTemplate,
} = testHelpers.helpers;

describe('QuizStepper Class', () => {
    let Component;
    let component;
    let element;
    let sandbox;
    let template;
    let eventListenerMock;
    let eventEmitter;

    before((done) => {
        eventListenerMock = mockEvents();
        eventEmitter = mockModule('core/Event', {
            Event: {
                on: sinon.stub(),
                removeListener: sinon.stub(),
                emit: sinon.stub(),
            },
        });

        // Retrieve template from backend folder
        template = getTemplate(null, 'components/global/quizstepper.hbs', {
            // Model needed for the HBS template
        });

        importModule('components/global/QuizStepper.js').then((module) => {
            Component = module.default;
        }).then(done);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        document.body.innerHTML = template;
        element = document.querySelector('[data-component="global/QuizStepper"]');
        component = new Component(element);
    });

    afterEach(() => {
        component.destroy();
        eventListenerMock.restore();
        eventEmitter.restore();
        document.body.innerHTML = '';
        sandbox.restore();
    });

    describe('constructor', () => {
        it('should have created the component', () => {
            expect(component).to.be.an('object');
        });

        it('should have proper default options', () => {
            expect(component.options).to.be.an('object');
        });

        it('should have proper class names', () => {
            const { classNames } = component.options;
            expect(classNames).to.be.an('object');
        });
    });

    describe('initCache', () => {
        it('should cache the contains selectors', () => {

        });
    });

    describe('initState', () => {

    });

    describe('bindEvents', () => {
        it('should listen minicarticon.hover event', () => {
            // expect(eventEmitter.Event.on).to.have.been.calledWith('minicarticon.hover');
        });
    });

    describe('afterInit', () => {

    });

    describe('destroy', () => {

    });
});
