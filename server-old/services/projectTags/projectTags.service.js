'use strict';

const { getModel } = require('../../models/projectTags.model');
const createService = require('feathers-sequelize');
const hooks = require('./projectTags.hooks');

module.exports = function (app) {
	const Model = getModel(app);
	Model.sync();
	const options = {
		name: 'tags',
		Model
	};
	app.use('/api/rest/v1/project-tags', createService(options));
	const service = app.service('/api/rest/v1/project-tags');
	service.hooks(hooks);
};
