import axios from 'axios';

import type { Myself } from '../types';
import { apiURL } from '../utils'

export default async(): Promise<Myself[]> => axios.get(apiURL('myself'));
