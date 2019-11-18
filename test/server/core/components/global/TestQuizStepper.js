'use strict';

var describe = require('mocha').describe;
var it = require('mocha').it;
var chai = require('chai');
var sinon = require('sinon');
sinon.test = require('sinon-test')(sinon);
var sinonChai = require('sinon-chai');
var expect = chai.expect;
var proxyquire = require('proxyquire').noCallThru();

chai.use(sinonChai);

require.extensions['.ds'] = require.extensions['.js'];
require('dw-api-mock/demandware-globals');

// add cartridges dir as module lookup location
require('app-module-path').addPath(process.cwd() + '/cartridges');
require('app-module-path').addPath(process.cwd() + '/cartridges/modules');

describe('NG LORA components - global/quizstepper', function () {
    var sandbox;
    var requireStub = {};

    proxyquire(process.cwd() + '/cartridges/app_training/cartridge/scripts/components/global/quizstepper.js', requireStub);
    var quizstepper = require('app_training/cartridge/scripts/components/global/quizstepper');

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    require('../sharedTests').run(quizstepper);

    describe('getModel()', function () {
        it('should return an object', sinon.test(function () {
            var model = quizstepper.createModel();
            expect(model).to.exist;
            expect(model).to.be.an('object');
        }));
    });
});
