'use strict';

const { BadRequest } = require('@feathersjs/errors');

module.exports = async function(context) {
	const { data } = context;
	if (!data.name) {
		throw new BadRequest('Name field requires a value');
	}
	if (!data.database) {
		throw new BadRequest('Database field requires a value');
	}
	return context;
};

