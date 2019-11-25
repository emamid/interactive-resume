'use strict';

const populateAssociations = require('../../hooks/tag-populate-associations');
const adjustStructure = require('../../hooks/tag-adjust-structure');

module.exports = {
	before: {
		all: [],
		find: [],
		get: [populateAssociations],
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
