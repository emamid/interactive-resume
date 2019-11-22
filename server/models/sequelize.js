'use strict';

const Sequelize = require('sequelize');

let sequelize = null;

module.exports = function() {
	if (!sequelize) {
		sequelize = new Sequelize('sequelize', '', '', {
			dialect: 'sqlite',
			storage: process.env.RESUME_DATABASE_FILE,
			logging: false,
			define: {
				freezeTableName: true,
				operatorAliases: false
			}
		});
	}
	return sequelize;
};
