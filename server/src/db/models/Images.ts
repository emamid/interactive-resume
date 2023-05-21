import { Sequelize, DataTypes } from 'sequelize';

const modelName = 'Image';

export const defineModel = (sequelize: Sequelize) => {
	sequelize.define(modelName,
		{
			filename: {
				type: DataTypes.TEXT,
				primaryKey: true
			},
			caption: {
				type: DataTypes.TEXT
			},
			description: {
				type: DataTypes.TEXT
			},
			projectID: {
				type: DataTypes.UUIDV4
			},
			sortOrder: {
				type: DataTypes.INTEGER
			}
		}, {
		tableName: 'images'
	});
};

export default {
	defineModel,
}
