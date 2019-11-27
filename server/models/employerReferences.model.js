'use strict';

const Sequelize = require('sequelize');

let EmployerReference;

function getModel(app) {

	const sequelize = require('./sequelize')();

	if (!EmployerReference) {
		EmployerReference = sequelize.define('EmployerReference', {
			id: {
				type: Sequelize.UUIDV4,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true
			},
			referenceID: {
				type: Sequelize.UUIDV4
			},
			employerID: {
				type: Sequelize.UUIDV4
			}
		}, {
			tableName: 'employer_references'
		});	
	}
	return EmployerReference;
}

module.exports = {
	getModel
}
