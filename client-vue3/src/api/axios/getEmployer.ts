import axios from 'axios';

import type { Employer } from '../types';
import { apiURL } from '../utils'

export default async(id: string): Promise<Employer> => {
	const { data } = await axios.get<Employer>(apiURL(`employers/${id}`));
	return data;
};
