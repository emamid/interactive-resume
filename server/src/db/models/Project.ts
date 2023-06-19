import { Sequelize, DataTypes } from 'sequelize';

const modelName = 'Project';

export const defineModel = (sequelize: Sequelize) => {
	sequelize.define(modelName,
		{
			id: {
				type: DataTypes.UUIDV4,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			name: {
				type: DataTypes.TEXT
			},
			pageContent: {
				type: DataTypes.TEXT
			},
			markdownContent: {
				type: DataTypes.TEXT
			},
			startDate: {
				type: DataTypes.DATE
			},
			endDate: {
				type: DataTypes.DATE
			},
			employerID: {
				type: DataTypes.UUIDV4
			},
			isPersonal: {
				type: DataTypes.BOOLEAN
			}
		}, {
		tableName: 'projects'
	});
};


export const associateModel = (sequelize: Sequelize) => {

	const { Employer, Image, Project, ProjectTag, Tag } = sequelize.models;

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

export default {
	defineModel,
	associateModel,
}
