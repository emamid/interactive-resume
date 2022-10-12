import { useQuery } from 'react-query';
import axios from 'axios';

import { apiURL } from '../utils';
import { Tags } from '../types';

const getTags = async () => {
	const { data } = await axios.get(
		apiURL('tags')
	);
	return data;
};

const useGetTags = () => {
	return useQuery<Tags, Error>(['tags'], () => getTags());
}

export default useGetTags;
