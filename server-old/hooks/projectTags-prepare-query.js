'use strict';

const sequelize = require('../models/sequelize')();

module.exports = function (context) {
	context.params.sequelize = {
		group: ['tagID'],
		attributes: ['id', 'projectID', 'tagID', [sequelize.fn('COUNT', 'tagID'), 'projectCount']],
		include: [{
			association: 'Tag',
			attributes: ['name', 'category', 'layer'],
		}],
		raw: false
	};
	return context;
};
