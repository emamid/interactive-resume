'use strict';

const prepareQuery = require('../../hooks/project-prepare-query');
const adjustStructure = require('../../hooks/project-adjust-structure');

module.exports = {
	before: {
		all: [],
		find: [],
		get: [prepareQuery],
		create: [],
		update: [],
		patch: [],
		remove: []
	},
	after: {
		all: [],
		find: [],
		get: [adjustStructure],
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
