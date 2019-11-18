'use strict';

/**
 * global quizstepper component.
 * PLEASE ADD GENERAL COMPONENT PURPOSE AND USE CASES DESCRIPTION HERE.
 *
 * @module components/global/quizstepper
 */

/**
 * Creates the model for the view, all logic should happen here and the template
 * should only decorate the model properties and contains no logic
 * @param {Array} quizzes - Quizzes
 * @returns {Object} model for the view
 */
exports.createModel = function (quizzes) {
    var model = {
        componentName : 'global/QuizStepper',
        quizzes       : quizzes,
    };

    return model;
};

/** the template used to render the model */
exports.template = 'components/global/quizstepper.hbs';
