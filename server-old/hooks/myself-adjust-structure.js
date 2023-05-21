'use strict';

const { sortBy } = require('lodash');

module.exports = function (context) {
	context.result = context.result[0] || {};
	context.result.dataValues.Projects = sortBy(context.result.dataValues.Projects, 'dataValues.name');
	return context;
};

