'use strict';

module.exports = function (context) {
	context.params.sequelize = {
		include: [{
			association: 'Projects',
			attributes: ['id', 'name', 'startDate', 'endDate']
		}],
		raw: false
	};
	return context;
};

