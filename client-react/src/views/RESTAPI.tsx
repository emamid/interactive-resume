import { useEffect, useState } from 'react';

import axios from 'axios';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { apiURL } from '@/api/utils';

import JSONViewer from '@/components/JSONViewer';

const idEndpoints = ['employers', 'projects', 'tags'];
const helperText: Record<string, string> = {
	'employers': 'employerID',
	'projects': 'projectID',
	'tags': 'tagID',
}

const allowsID = (endpoint: string) => idEndpoints.indexOf(endpoint) !== -1;

const RESTAPI = () => {
	const [lastEndpoint, setLastEndpoint] = useState('');
	const [lastURL, setLastURL] = useState('');
	const [endpoint, setEndpoint] = useState<string>(localStorage.getItem('rest-endpoint') || 'employers');
	const [id, setID] = useState<string>(localStorage.getItem('rest-id') || '');
	const [data, setData] = useState<any>();
	const [statusMessage, setStatusMessage] = useState<string>();

	const makeRequest = async () => {
		try {
			setLastEndpoint(endpoint);
			const url = apiURL(`${endpoint}/${(allowsID(endpoint) && id?.length) ? id.trim() : ''}`);
			setLastURL(url);
			console.log('url = ', url)
			const response = await axios.get<any>(url);
			setData(response.data);
			setStatusMessage('');
		} catch (error: any) {
			setData(null);
			const { response: { status, statusText } } = error;
			setStatusMessage(`${status}: ${statusText}`);
		}
	}

	const itemClicked = (id: string) => {
		setID(id);
		setEndpoint(lastEndpoint);
		makeRequest();
	}

	useEffect(() => {
		makeRequest();
	});

	return (
		<div className="rest-api">
			<div>
				<Typography component="h5" variant="h5" gutterBottom={true}>REST API</Typography>
				<div className="controls">
				<FormControl variant="standard" style={{ width: '15em' }}>
					<InputLabel>Endpoint</InputLabel>
					<Select
						value={endpoint}
						onChange={event => {
							localStorage.setItem('rest-endpoint', event?.target?.value);
							setEndpoint(event.target.value || '');
						}}
						label="Endpoint"
					>
						<MenuItem value={'employers'}>employers</MenuItem>
						<MenuItem value={'myself'}>myself</MenuItem>
						<MenuItem value={'projects'}>projects</MenuItem>
						<MenuItem value={'project-tags'}>project-tags</MenuItem>
						<MenuItem value={'tags'}>tags</MenuItem>
					</Select>
				</FormControl>
				{allowsID(endpoint) && <FormControl variant="standard" style={{ width: '20em' }}>
					<TextField
						label="id"
						variant="standard"
						value={id}
						helperText={helperText[endpoint]}
						onChange={event => {
							localStorage.setItem('rest-id', event?.target?.value);
							setID(event.target.value || '');
						}}
					/>
				</FormControl>}
				</div>
				<Button variant="contained" onClick={makeRequest}>Request</Button>
			</div>			
			{data && <>
				<Typography component="h5" variant="h5">Response data for {lastURL}:</Typography>
				<JSONViewer data={data} allowsID={allowsID(endpoint)} itemClicked={itemClicked}/>
			</>}
			{statusMessage && <>
				<Typography component="h5" variant="h5">Response data for {lastURL}:</Typography>
				<pre>{statusMessage}</pre>
			</>}
		</div>
	);
};

export default RESTAPI;
