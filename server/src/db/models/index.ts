import { Sequelize, ModelStatic } from 'sequelize';

import employerReferences from './EmployerReference';
import employers from './Employer';
import images from './Images';
import myself from './Myself';
import projects from './Project';
import projectTags from './ProjectTag';
import references from './Reference';
import tags from './Tags';

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
