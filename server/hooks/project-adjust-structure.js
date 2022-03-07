'use strict';

const { sortBy } = require('lodash');

module.exports = function (context) {
	context.result.dataValues.Tags = sortBy(context.result.dataValues.Tags, 'dataValues.name');
	context.result.dataValues.Images = sortBy(context.result.dataValues.Images, 'dataValues.sortOrder');
	return context;
};
