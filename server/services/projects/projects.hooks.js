'use strict';

const populateAssociations = require('../../hooks/project-populate-associations');
const adjustStructure = require('../../hooks/project-adjust-structure');

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
