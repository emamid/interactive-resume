import { getSequelize } from '..';

export const getAll = async() => {

	const sequelize = getSequelize();

	const { Project } = sequelize.models;

	const projects = await Project.findAll({
		attributes: {
			exclude: ['createdAt', 'pageContent', 'updatedAt']
		},
		include: [{
			association: 'Employer',
			attributes: ['name']
		}],
		order: [['startDate', 'DESC']],
		raw: false
	});
	
	return projects.map(model => model.toJSON());
}

export const getByID = async(id: string) => {
	const sequelize = getSequelize();

	const { Project } = sequelize.models;

	const project = await Project.findByPk(id, {
		attributes: {
			exclude: ['createdAt', 'updatedAt'],
		},
		include: [{
			association: 'Employer',
			attributes: ['name']
		}, {
			association: 'Tags',
			attributes: ['id', 'name'],
			order: [
				['name', 'ASC']
			]	
		}, {
			association: 'Images',
			attributes: ['filename', 'caption', 'description', 'sortOrder'],
			order: [
				['sortOrder', 'ASC']
			]	
		}],
		raw: false
	});

	return project.toJSON();
}
