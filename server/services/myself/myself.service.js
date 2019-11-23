'use strict';

const { getModel } = require('../../models/myself.model');
const createService = require('feathers-sequelize');
const hooks = require('./myself.hooks');

module.exports = function(app) {
	const Model = getModel(app);
	Model.sync();
	const options = {
		name: 'myself',
		Model
	};
	app.use('/api/rest/myself', createService(options));
	const service = app.service('/api/rest/myself');
	service.hooks(hooks);
};
