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
			},
			latitude: {
				type: Sequelize.NUMBER
			},
			longitude: {
				type: Sequelize.NUMBER
			}
		}, {
			tableName: 'employers'
		});
	}
	return Employer;
}

function associateModel(app) {

	const sequelize = require('./sequelize')();

	const { EmployerReference, Project, Reference } = sequelize.models;

	Employer.hasMany(Project, {
		foreignKey: 'employerID',
		as: 'Projects'
	});

	Employer.belongsToMany(Reference, {
		as: 'References',
		constraints: false,
		foreignKey: 'employerID',
		otherKey: 'referenceID',
		through: {
			model: EmployerReference,
			unique: false
		}
	})

}

module.exports = {
	associateModel,
	getModel
}
