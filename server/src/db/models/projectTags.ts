import { Sequelize, DataTypes } from 'sequelize';

const modelName = 'ProjectTag';

export const defineModel = (sequelize: Sequelize) => {
	sequelize.define(modelName,
		{
			id: {
				type: DataTypes.UUIDV4,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			projectID: {
				type: DataTypes.UUIDV4
			},
			tagID: {
				type: DataTypes.UUIDV4
			}
		}, {
		tableName: 'project_tags'
	});
};

export const associateModel = (sequelize: Sequelize) => {

	const { Project, ProjectTag, Tag } = sequelize.models;

	ProjectTag.belongsTo(Tag, {
		foreignKey: 'tagID',
		as: 'Tag'
	});

	ProjectTag.belongsTo(Project, {
		foreignKey: 'projectID',
		as: 'Project'
	});
}

export default {
	defineModel,
	associateModel,
}
