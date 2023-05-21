'use strict';

const sequelize = require('../models/sequelize')();

module.exports = function (context) {
	context.params.sequelize = {
		attributes: ['id', 'name'],
		order: [sequelize.fn('lower', sequelize.col('name'))],
		raw: false
	};
	return context;
};
