'use strict';

const { getModel } = require('../../models/projects.model');
const createService = require('feathers-sequelize');
const hooks = require('./projects.hooks');

module.exports = function (app) {
	const Model = getModel(app);
	Model.sync();
	const options = {
		name: 'projects',
		Model
	};
	app.use('/api/rest/v1/projects', createService(options));
	const service = app.service('/api/rest/v1/projects');
	service.hooks(hooks);
};
