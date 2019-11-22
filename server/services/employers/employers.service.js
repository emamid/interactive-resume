'use strict';

const { getModel } = require('../../models/employers.model');
const createService = require('feathers-sequelize');
const hooks = require('./employers.hooks');

module.exports = function(app) {
	const Model = getModel(app);
	Model.sync();
	const options = {
		name: 'employers',
		Model
	};
	app.use('/api/rest/employers', createService(options));
	const service = app.service('/api/rest/employers');
	service.hooks(hooks);
};
