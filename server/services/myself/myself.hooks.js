'use strict';

const adjustStructure = require('../../hooks/myself-adjust-structure');

module.exports = {
	before: {
		all: [],
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
