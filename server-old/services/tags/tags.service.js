'use strict';

const { getModel } = require('../../models/tags.model');
const createService = require('feathers-sequelize');
const hooks = require('./tags.hooks');

module.exports = function (app) {
	const Model = getModel(app);
	Model.sync();
	const options = {
		name: 'tags',
		Model
	};
	app.use('/api/rest/tags', createService(options));
	const service = app.service('/api/rest/tags');
	service.hooks(hooks);
};
