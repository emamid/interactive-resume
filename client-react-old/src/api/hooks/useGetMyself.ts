import { useQuery } from 'react-query';
import axios from 'axios';

import { apiURL } from '../utils';
import { Myself } from '../types';

const getMyself = async () => {
	const { data } = await axios.get(
		apiURL('myself')
	);
	return data;
};

const useGetMyself = () => {
	return useQuery<Myself, Error>(['myself'], () => getMyself());
}

export default useGetMyself;
