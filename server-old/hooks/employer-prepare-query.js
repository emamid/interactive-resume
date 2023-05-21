'use strict';

module.exports = function (context) {
	context.params.sequelize = {
		include: [{
			association: 'Projects',
			attributes: ['id', 'name', 'employerID']
		}, {
			association: 'References',
			attributes: ['id', 'name', 'url']
		}],
		raw: false
	};
	return context;
};

