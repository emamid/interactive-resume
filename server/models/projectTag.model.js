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

module.exports = {
	getModel
}
