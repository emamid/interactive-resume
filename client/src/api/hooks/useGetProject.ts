import { useQuery } from 'react-query';
import axios from 'axios';

import { apiURL } from '../utils';
import { Project } from '../types';

const getProjectByID = async (id: string) => {
	const { data } = await axios.get(
		apiURL(`projects/${id}`)
	);
	return data;
};

const useGetProject = (id: string) => {
	return useQuery<Project, Error>(['employer', id], () => getProjectByID(id), { enabled: !!id });
}

export default useGetProject;
