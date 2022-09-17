import { useQuery } from 'react-query';
import axios from 'axios';

import { apiURL } from '../utils';
import { Employers } from '../types';

const getEmployers = async () => {
	const { data } = await axios.get(
		apiURL('employers')
	);
	return data;
};

const useGetEmployers = () => {
	return useQuery<Employers, Error>(['employers'], () => getEmployers());
}

export default useGetEmployers;
