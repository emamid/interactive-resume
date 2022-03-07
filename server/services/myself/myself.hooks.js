'use strict';

const adjustStructure = require('../../hooks/myself-adjust-structure');
const prepareQuery = require('../../hooks/myself-prepare-query');

module.exports = {
	before: {
		all: [prepareQuery],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	},
	after: {
		all: [adjustStructure],
		find: [],
		get: [],
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
