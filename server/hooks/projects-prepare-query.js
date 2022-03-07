'use strict';

module.exports = function (context) {
	context.params.sequelize = {
		include: [{
			association: 'Employer',
			attributes: ['name']
		}],
		order: [['startDate', 'DESC']],
		raw: false
	};
	return context;
};
