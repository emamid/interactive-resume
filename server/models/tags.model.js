'use strict';

const Sequelize = require('sequelize');

let Tag;

function getModel(app) {

	if (!Tag) {
		const sequelize = require('./sequelize')();

		Tag = sequelize.define('Tag', {
			id: {
				type: Sequelize.UUIDV4,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true
			},
			name: {
				type: Sequelize.TEXT
			}
		}, {
			tableName: 'tags'
		});	
	}
	return Tag;
}

function associateModel(app) {

	const sequelize = require('./sequelize')();

	const { Project, ProjectTag } = sequelize.models;

	Tag.belongsToMany(Project, {
		as: 'Projects',
		constraints: false,
		foreignKey: 'tagID',
		otherKey: 'projectID',
		through: {
			model: ProjectTag,
			unique: false
		}
	})

}

module.exports = {
	associateModel,
	getModel
}
