'use strict';

const Sequelize = require('sequelize');

let Image;

function getModel(app) {
	const sequelize = require('./sequelize')();

	if (!Image) {
		Image = sequelize.define('Image', {
			filename: {
				type: Sequelize.TEXT,
				primaryKey: true
			},
			caption: {
				type: Sequelize.TEXT
			},
			description: {
				type: Sequelize.TEXT
			},
			projectID: {
				type: Sequelize.UUIDV4
			},
			sortOrder: {
				type: Sequelize.INTEGER
			}
		}, {
			tableName: 'images'
		});
	}

	return Image;
}

module.exports = {
	getModel
}
