'use strict';

const Sequelize = require('sequelize');

let Employer;

function getModel(app) {

	const sequelize = require('./sequelize')();

	if (!Employer) {
		Employer = sequelize.define('Employer', {
			id: {
				type: Sequelize.UUIDV4,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true
			},
			name: {
				type: Sequelize.TEXT
			},
			position: {
				type: Sequelize.TEXT
			},
			pageContent: {
				type: Sequelize.TEXT
			},
			url: {
				type: Sequelize.TEXT
			},
			startDate: {
				type: Sequelize.DATE
			},
			endDate: {
				type: Sequelize.DATE
			}
		}, {
			tableName: 'employers'
		});	
	}
	return Employer;
}

function associateModel(app) {

	const sequelize = require('./sequelize')();

	const Project = sequelize.models.Project;

	Employer.hasMany(Project, {
		foreignKey: 'employerID',
		as: 'Projects'
	});
}

module.exports = {
	associateModel,
	getModel
}
