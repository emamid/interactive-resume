import axios from 'axios';

import type { Project } from '../types';
import { apiURL } from '../utils'

export default async(id: string): Promise<Project> => {
	const { data } = await axios.get<Project>(apiURL(`projects/${id}`));
	return data;
};
