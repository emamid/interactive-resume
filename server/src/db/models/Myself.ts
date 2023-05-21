import { Sequelize, DataTypes } from 'sequelize';

const modelName = 'Myself';

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
			personalEmployerID: {
				type: DataTypes.UUIDV4,
				defaultValue: DataTypes.UUIDV4
			},
		}, {
		tableName: 'myself'
	});
};

export const associateModel = (sequelize: Sequelize) => {

	const { Myself, Project } = sequelize.models;

	Myself.hasMany(Project, {
		foreignKey: 'employerID',
		sourceKey: 'personalEmployerID',
		as: 'Projects'
	});
}

export default {
	defineModel,
	associateModel,
}
