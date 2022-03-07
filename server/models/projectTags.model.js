'use strict';

const Sequelize = require('sequelize');

let ProjectTag;

function getModel(app) {

	const sequelize = require('./sequelize')();

	if (!ProjectTag) {
		ProjectTag = sequelize.define('ProjectTag', {
			id: {
				type: Sequelize.UUIDV4,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true
			},
			projectID: {
				type: Sequelize.UUIDV4
			},
			tagID: {
				type: Sequelize.UUIDV4
			}
		}, {
			tableName: 'project_tags'
		});
	}
	return ProjectTag;
}

function associateModel(app) {

	const sequelize = require('./sequelize')();

	const { Project, ProjectTag, Tag } = sequelize.models;

	ProjectTag.belongsTo(Tag, {
		foreignKey: 'tagID',
		as: 'Tag'
	});

	ProjectTag.belongsTo(Project, {
		foreignKey: 'projectID',
		as: 'Project'
	});

}

module.exports = {
	associateModel,
	getModel
}
