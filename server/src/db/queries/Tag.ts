import { getSequelize } from '..';

export const getAll = async() => {

	const sequelize = getSequelize();

	const { Tag } = sequelize.models;

	const tags = await Tag.findAll({
		attributes: ['id', 'name'],
		order: [sequelize.fn('lower', sequelize.col('name'))],
		raw: false
	});
	
	return tags.map(model => model.toJSON());
}

export const getByID = async(id: string) => {
	const sequelize = getSequelize();

	const { Tag } = sequelize.models;

	const tag = await Tag.findByPk(id, {
		attributes: ['id', 'name'],
		include: [{
			association: 'Projects',
			attributes: ['id', 'name', 'employerID'],
			include: [{
				association: 'Employer',
				attributes: ['name']
			}],
			order: [
				['name', 'ASC']
			]	
		}],
		raw: false
	});

	return tag.toJSON();
}
