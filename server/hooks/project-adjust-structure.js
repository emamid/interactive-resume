'use strict';

const { sortBy } = require('lodash');

module.exports = function(context) {
    context.result.dataValues.Tags = sortBy(context.result.dataValues.Tags, 'dataValues.name');
    return context;
};
