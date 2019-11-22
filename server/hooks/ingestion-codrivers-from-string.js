'use strict';

const { isArray } = require('lodash');

const parseCoDrivers = function(ingestion) {
	return {...ingestion, co_drivers: ingestion.co_drivers ? JSON.parse(ingestion.co_drivers) : []}
}

module.exports = function(context) {
	context.result = isArray(context.result) ? context.result.map(parseCoDrivers) : parseCoDrivers(context.result);
	return Promise.resolve(context);
};

