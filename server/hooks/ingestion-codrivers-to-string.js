'use strict';

const { isArray } = require('lodash');

module.exports = function(context) {
	context.data.co_drivers = isArray(context.data.co_drivers) ? JSON.stringify(context.data.co_drivers) : '[]';
	return Promise.resolve(context);
};
