'use strict';

const Sequelize = require('sequelize');

let Myself;

function getModel(app) {

	const sequelize = require('./sequelize')();

	if (!Myself) {
		Myself = sequelize.define('Myself', {
			id: {
				type: Sequelize.UUIDV4,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true
			},
			name: {
				type: Sequelize.TEXT
			},
			pageContent: {
				type: Sequelize.TEXT
			},
			personalEmployerID: {
				type: Sequelize.UUIDV4,
				defaultValue: Sequelize.UUIDV4
			},

		}, {
			tableName: 'myself'
		});
	}
	return Myself;
}

function associateModel(app) {

	const sequelize = require('./sequelize')();

	const Project = sequelize.models.Project;

	Myself.hasMany(Project, {
		foreignKey: 'employerID',
		sourceKey: 'personalEmployerID',
		as: 'Projects'
	});
}

module.exports = {
	associateModel,
	getModel
}
