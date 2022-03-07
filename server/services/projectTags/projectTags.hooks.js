'use strict';

const prepareQueryAll = require('../../hooks/projectTags-prepare-query');

module.exports = {
	before: {
		all: [],
		find: [prepareQueryAll],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	},
	after: {
		all: [],
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
