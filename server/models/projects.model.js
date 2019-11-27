'use strict';

const Sequelize = require('sequelize');

let Project;

function getModel(app) {
	const sequelize = require('./sequelize')();

	if (!Project) {
		Project = sequelize.define('Project', {
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
			startDate: {
				type: Sequelize.DATE
			},
			endDate: {
				type: Sequelize.DATE
			},
			employerID: {
				type: Sequelize.UUIDV4			
			},
			isPersonal: {
				type: Sequelize.BOOLEAN
			}
		}, {
			tableName: 'projects'
		});	
	}

	return Project;	
}

function associateModel(app) {

	const sequelize = require('./sequelize')();

	const { Employer, Image, ProjectTag, Tag } = sequelize.models;

	Project.belongsTo(Employer, {
		foreignKey: 'employerID',
		as: 'Employer'
	});

	Project.belongsToMany(Tag, {
		as: 'Tags',
		constraints: false,
		foreignKey: 'projectID',
		otherKey: 'tagID',
		through: {
			model: ProjectTag,
			unique: false
		}
	})

	Project.hasMany(Image, {
		foreignKey: 'projectID',
		as: 'Images'
	});


}

module.exports = {
	associateModel,
	getModel
}
