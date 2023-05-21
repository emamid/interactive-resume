import { getSequelize } from '..';

export const getOnly = async() => {

	const sequelize = getSequelize();

	const { Myself } = sequelize.models;

	const myself = await Myself.findOne({
		attributes: {
			exclude: ['createdAt', 'updatedAt'],
		},
		include: [{
			association: 'Projects',
			attributes: ['id', 'name', 'startDate', 'endDate'],
			order: [
				['startDate', 'DESC']
			]	
		}],
		raw: false
	});

	return myself.toJSON();

}
