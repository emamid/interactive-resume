import { Op } from 'sequelize';

import { getSequelize } from '..';

export const getAll = async() => {

	const sequelize = getSequelize();

	const { Employer, Myself } = sequelize.models;

	const myself = await Myself.findOne();

	const employers = await Employer.findAll({
		attributes: {
			exclude: ['createdAt', 'pageContent', 'updatedAt']
		},
		where: {
			id: {
				[Op.ne]: myself.dataValues.personalEmployerID
			}
		},
		order: [
			['startDate', 'DESC']
		]
	});
	
	return employers.map(model => model.toJSON());
}

export const getByID = async(id: string) => {
	const sequelize = getSequelize();

	const { Employer } = sequelize.models;

	const employer = await Employer.findByPk(id, {
		attributes: {
			exclude: ['createdAt', 'updatedAt'],
		},
		include: [{
			association: 'Projects',
			attributes: {
				exclude: ['createdAt', 'updatedAt'],				
			},
			order: [
				['name', 'ASC']
			]	
		}, {
			association: 'References',
			attributes: ['id', 'name', 'url'],
			order: [
				['name', 'ASC']
			]	
		}],
		raw: false
	});

	return employer?.toJSON();
}
