import axios from 'axios';

import type { Employer } from '../types';
import { apiURL } from '../utils'

export default async(): Promise<Employer[]> => {
	const { data } = await axios.get<Employer[]>(apiURL('employers'));
	return data;
};
