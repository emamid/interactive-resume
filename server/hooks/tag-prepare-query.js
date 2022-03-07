'use strict';

module.exports = function (context) {
	context.params.sequelize = {
		attributes: ['id', 'name'],
		include: [{
			association: 'Projects',
			attributes: ['id', 'name', 'employerID'],
			include: [{
				association: 'Employer',
				attributes: ['name']
			}]
		}],
		raw: false
	};
	return context;
};
