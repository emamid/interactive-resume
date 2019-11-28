'use strict';

const prepareQueryAll = require('../../hooks/projects-prepare-query');
const prepareQueryGet = require('../../hooks/project-prepare-query');
const adjustStructure = require('../../hooks/project-adjust-structure');

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
