import axios from 'axios';

import type { Tag } from '../types';
import { apiURL } from '../utils'

export default async(id: string): Promise<Tag> => {
	const { data } = await axios.get<Tag>(apiURL(`tags/${id}`));
	return data;
};
