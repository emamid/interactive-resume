import { Sequelize } from 'sequelize';

import models from './models';

let sequelize: Sequelize = null;

export const initialize = (dataDir: string) => {
	sequelize = new Sequelize('sequelize', '', '', {
		dialect: 'sqlite',
		storage: `${dataDir}/resume.sqlite`,
		logging: false,
		define: {
			freezeTableName: true,
		}
	});

	models.forEach(model => model.defineModel(sequelize));
	models.forEach(model => model.associateModel?.(sequelize));
}

export default () => sequelize;
