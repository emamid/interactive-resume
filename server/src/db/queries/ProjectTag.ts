import { getSequelize } from '..';

export const getAll = async() => {

	const sequelize = getSequelize();

	const { ProjectTag } = sequelize.models;

	const projectTags = await ProjectTag.findAll({
		group: ['tagID'],
		attributes: ['id', 'projectID', 'tagID', [sequelize.fn('COUNT', 'tagID'), 'projectCount']],
		include: [{
			association: 'Tag',
			attributes: ['name', 'category', 'layer'],
		}],
		raw: false
	});
	
	return projectTags.map(model => model.toJSON());
}
