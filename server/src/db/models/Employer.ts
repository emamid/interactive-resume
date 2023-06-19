import { Sequelize, DataTypes } from 'sequelize';

const modelName = 'Employer';

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
			position: {
				type: DataTypes.TEXT
			},
			pageContent: {
				type: DataTypes.TEXT
			},
			markdownContent: {
				type: DataTypes.TEXT
			},
			url: {
				type: DataTypes.TEXT
			},
			startDate: {
				type: DataTypes.DATE
			},
			endDate: {
				type: DataTypes.DATE
			},
			latitude: {
				type: DataTypes.NUMBER
			},
			longitude: {
				type: DataTypes.NUMBER
			}
		}, {
		tableName: 'employers'
	});
};

export const associateModel = (sequelize: Sequelize) => {

	const { Employer, EmployerReference, Project, Reference } = sequelize.models;

	Employer.hasMany(Project, {
		foreignKey: 'employerID',
		as: 'Projects'
	});

	Employer.belongsToMany(Reference, {
		as: 'References',
		constraints: false,
		foreignKey: 'employerID',
		otherKey: 'referenceID',
		through: {
			model: EmployerReference,
			unique: false
		}
	})
}

export default {
	defineModel,
	associateModel,
}
