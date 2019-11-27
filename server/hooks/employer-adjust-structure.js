'use strict';

const { sortBy } = require('lodash');

module.exports = function(context) {
    context.result.dataValues.Projects = sortBy(context.result.dataValues.Projects, 'dataValues.name');
    context.result.dataValues.References = sortBy(context.result.dataValues.References, 'dataValues.name');
    return context;
};
