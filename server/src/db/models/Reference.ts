import { Sequelize, DataTypes } from 'sequelize';

const modelName = 'Reference';

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
			url: {
				type: DataTypes.TEXT
			}
		}, {
		tableName: 'references'
	});
};

export default {
	defineModel,
}
