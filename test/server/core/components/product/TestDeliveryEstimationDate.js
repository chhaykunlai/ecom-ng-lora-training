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

describe('NG LORA components - product/deliveryestimationdate', function () {
    var sandbox;
    var requireStub = {};

    proxyquire(process.cwd() + '/cartridges/app_training/cartridge/scripts/components/product/deliveryestimationdate.js', requireStub);
    var deliveryestimationdate = require('app_training/cartridge/scripts/components/product/deliveryestimationdate');

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    require('../sharedTests').run(deliveryestimationdate);

    describe('getModel()', function () {
        it('should return an object', sinon.test(function () {
            var model = deliveryestimationdate.createModel();
            expect(model).to.exist;
            expect(model).to.be.an('object');
        }));
    });
});
