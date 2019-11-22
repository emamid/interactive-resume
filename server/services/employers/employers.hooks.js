'use strict';

const populateAssociations = require('../../hooks/employer-populate-associations');

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
