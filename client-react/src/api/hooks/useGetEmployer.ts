import { useQuery } from 'react-query';
import axios from 'axios';

import { apiURL } from '../utils';
import { Employer } from '../types';

const getEmployerByID = async (id: string) => {
	const { data } = await axios.get(
		apiURL(`employers/${id}`)
	);
	return data;
};

const useGetEmployer = (id: string) => {
	return useQuery<Employer, Error>(['employer', id], () => getEmployerByID(id), { enabled: !!id });
}

export default useGetEmployer;
