import { useQuery } from 'react-query';
import axios from 'axios';

import { apiURL } from '../utils';
import { Projects } from '../types';

const getProjects = async () => {
	const { data } = await axios.get(
		apiURL('projects')
	);
	return data;
};

const useGetProjects = () => {
	return useQuery<Projects, Error>(['employers'], () => getProjects());
}

export default useGetProjects;
