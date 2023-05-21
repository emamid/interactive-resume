import { Sequelize, DataTypes } from 'sequelize';

const modelName = 'EmployerReference';

export const defineModel = (sequelize: Sequelize) => {
	sequelize.define(modelName,
		{
			id: {
				type: DataTypes.UUIDV4,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			referenceID: {
				type: DataTypes.UUIDV4
			},
			employerID: {
				type: DataTypes.UUIDV4
			}
		}, {
		tableName: 'employer_references'
	});
};

export default {
	defineModel
}
