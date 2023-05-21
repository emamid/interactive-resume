'use strict';

const Sequelize = require('sequelize');

let sequelize = null;

module.exports = function () {
	if (!sequelize) {
		console.log('Database file: ', `${process.env.RESUME_DATA_DIR}/resume.sqlite`);
		sequelize = new Sequelize('sequelize', '', '', {
			dialect: 'sqlite',
			storage: `${process.env.RESUME_DATA_DIR}/resume.sqlite`,
			logging: false,
			define: {
				freezeTableName: true,
				operatorAliases: false
			}
		});
	}
	return sequelize;
};
