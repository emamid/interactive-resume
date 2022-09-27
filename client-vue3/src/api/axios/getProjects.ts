import axios from 'axios';

import type { Project } from '../types';
import { apiURL } from '../utils'

export default async(): Promise<Project[]> => {
	const { data } = await axios.get<Project[]>(apiURL('projects'));
	return data;
};
