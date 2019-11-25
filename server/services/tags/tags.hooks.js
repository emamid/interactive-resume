'use strict';

const prepareQueryGet = require('../../hooks/tag-prepare-query');
const adjustStructure = require('../../hooks/tag-adjust-structure');
const prepareQueryAll = require('../../hooks/tags-prepare-query');

module.exports = {
	before: {
		all: [],
		find: [prepareQueryAll],
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
