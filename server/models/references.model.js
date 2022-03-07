'use strict';

const Sequelize = require('sequelize');

let Reference;

function getModel(app) {

	if (!Reference) {
		const sequelize = require('./sequelize')();

		Reference = sequelize.define('Reference', {
			id: {
				type: Sequelize.UUIDV4,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true
			},
			name: {
				type: Sequelize.TEXT
			},
			url: {
				type: Sequelize.TEXT
			}
		}, {
			tableName: 'references'
		});
	}
	return Reference;
}

module.exports = {
	getModel
}
