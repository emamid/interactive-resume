import { Sequelize, ModelStatic } from 'sequelize';

import employerReferences from './employerReferences';
import employers from './employers';
import images from './images';
import myself from './myself';
import projects from './projects';
import projectTags from './projectTags';
import references from './references';
import tags from './tags';

interface ModelInfo {
	defineModel: (sequelize: Sequelize) => void,
	associateModel?: (sequelize: Sequelize) => void,
}

const modelInfo: ModelInfo[] = [
	employerReferences,
	employers,
	images,
	myself,
	projects,
	projectTags,
	references,
	tags,
];

export default modelInfo;
