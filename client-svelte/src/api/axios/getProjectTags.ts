import axios from 'axios';

import type { ProjectTags } from '../types';
import { apiURL } from '../utils'

export default async(): Promise<ProjectTags> => {
	const { data } = await axios.get<ProjectTags>(apiURL('project-tags'));
	return data;
};
