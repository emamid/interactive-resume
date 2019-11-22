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

}

module.exports = {
	associateModel,
	getModel
}

// module.exports = function(app) {

// 	const sequelize = require('./sequelize')();

// 	const Tag = sequelize.define('tag', {
// 		id: {
// 			type: Sequelize.UUIDV4,
// 			defaultValue: Sequelize.UUIDV4,
// 			primaryKey: true
// 		},
// 		name: {
// 			type: Sequelize.TEXT
// 		}
// 	}, {
//         tableName: 'tags'
//     });
// 	return Tag;
// };
