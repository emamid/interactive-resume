import { Sequelize, DataTypes } from 'sequelize';

const modelName = 'Tag';

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
			category: {
				type: DataTypes.TEXT
			},
			layer: {
				type: DataTypes.TEXT
			}
		}, {
		tableName: 'tags'
	});
};

export const associateModel = (sequelize: Sequelize) => {

	const { Project, ProjectTag, Tag } = sequelize.models;

	Tag.belongsToMany(Project, {
		as: 'Projects',
		constraints: false,
		foreignKey: 'tagID',
		otherKey: 'projectID',
		through: {
			model: ProjectTag,
			unique: false
		}
	})
}

export default {
	defineModel,
	associateModel,
}
