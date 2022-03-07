'use strict';

const prepareQueryGet = require('../../hooks/employer-prepare-query');
const prepareQueryAll = require('../../hooks/employers-prepare-query');
const adjustStructureGet = require('../../hooks/employer-adjust-structure');

module.exports = {
	before: {
		all: [prepareQueryAll],
		find: [],
		get: [prepareQueryGet],
		create: [],
		update: [],
		patch: [],
		remove: []
	},
	after: {
		all: [],
		find: [],
		get: [adjustStructureGet],
		create: [],
		update: [],
		patch: [],
		remove: []
	},
	error: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	}
};
