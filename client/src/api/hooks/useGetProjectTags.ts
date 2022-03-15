import { useQuery } from 'react-query';
import axios from 'axios';

import { apiURL } from '../utils';
import { ProjectTags } from '../types';

const getProjectTags = async () => {
	const { data } = await axios.get(
		apiURL('project-tags')
	);
	return data;
};

const useGetProjectTags = () => {
	return useQuery<ProjectTags, Error>(['projectTags'], () => getProjectTags());
}

export default useGetProjectTags;
