import { useQuery } from 'react-query';
import axios from 'axios';

import { apiURL } from '../utils';
import { Tag } from '../types';

const getTagByID = async (id: string) => {
	const { data } = await axios.get(
		apiURL(`tags/${id}`)
	);
	return data;
};

const useGetTag = (id: string) => {
	return useQuery<Tag, Error>(['tag', id], () => getTagByID(id), { enabled: !!id });
}

export default useGetTag;
