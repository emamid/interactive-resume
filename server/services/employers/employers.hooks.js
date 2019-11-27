'use strict';

const preparQueryGet = require('../../hooks/employer-prepare-query');
const preparQueryAll = require('../../hooks/employers-prepare-query');
const adjustStructureGet = require('../../hooks/employer-adjust-structure');

module.exports = {
	before: {
		all: [preparQueryAll],
		find: [],
		get: [preparQueryGet],
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
