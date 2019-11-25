'use strict';

const preparQuery = require('../../hooks/employer-prepare-query');

module.exports = {
	before: {
		all: [],
		find: [],
		get: [preparQuery],
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
