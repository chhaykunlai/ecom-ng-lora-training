'use strict';

/**
 * global quiz component.
 * PLEASE ADD GENERAL COMPONENT PURPOSE AND USE CASES DESCRIPTION HERE.
 *
 * @module components/global/quiz
 */

/**
 * Creates the model for the view, all logic should happen here and the template
 * should only decorate the model properties and contains no logic
 * @returns {Object} model for the view
 */
exports.createModel = function () {
    var model = {
        componentName : 'global/Quiz',
        quizzes       : getQuizzes.bind(this)(),
    };

    return model;
};

/** the template used to render the model */
exports.template = 'components/global/quiz.hbs';
exports.subComponents = ['global/quizstepper'];

/**
 * Get default quizzes
 * There are 5 quizzes
 * @returns {Array} quizzes - Quizzes
 */
function getQuizzes() {
    const quizNumber = parseInt(this.resource('number'), 10) || 5;
    let quizzes = [];

    for (let i = 1; i <= quizNumber; i++) {
        quizzes.push({
            name: this.resource('name', i),
        });
    }

    return quizzes;
}
