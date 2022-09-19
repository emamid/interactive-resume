import axios from 'axios';

import type { Myself } from '../types';
import { apiURL } from '../utils'

export default async(): Promise<Myself> => {
	const { data } = await axios.get(apiURL('myself'));
	return data as Myself;
};
