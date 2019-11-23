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
			}
		}, {
			tableName: 'myself'
		});	
	}
	return Myself;
}


module.exports = {
	getModel
}
