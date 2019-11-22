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
			notes: {
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
			}
		}, {
			tableName: 'projects'
		});	
	}

	return Project;	
}

function associateModel(app) {

	const sequelize = require('./sequelize')();

	const { Employer, ProjectTag, Tag } = sequelize.models;

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

}

module.exports = {
	associateModel,
	getModel
}

// module.exports = function(app) {

// 	const sequelize = require('./sequelize')();

// 	const Project = sequelize.define('project', {
// 		id: {
// 			type: Sequelize.UUIDV4,
// 			defaultValue: Sequelize.UUIDV4,
// 			primaryKey: true
// 		},
// 		name: {
// 			type: Sequelize.TEXT
// 		},
// 		notes: {
// 			type: Sequelize.TEXT
// 		},
//         startDate: {
//             type: Sequelize.DATE
//         },
//         endDate: {
//             type: Sequelize.DATE
// 		},
// 		employerID: {
// 			type: Sequelize.UUIDV4			
// 		}
// 	}, {
//         tableName: 'projects'
// 	});

// 	return Project;
// };
