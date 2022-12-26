import { useEffect, useState } from 'react';

import axios from 'axios';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
			localStorage.setItem('rest-endpoint', endpoint);
			localStorage.setItem('rest-id', id);
			const url = apiURL(`${endpoint}/${(allowsID(endpoint) && id?.length) ? id.trim() : ''}`);
			setLastURL(url);
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

	const clearID = () => setID('');

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
						<InputLabel>id</InputLabel>
						<Input
							value={id}
							onChange={event => {
								setID(event.target.value || '');
							}}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										edge="end"
										onClick={clearID}
									>
										<DeleteIcon />
									</IconButton>
								</InputAdornment>
							}
						/>
						<FormHelperText>{helperText[endpoint]}</FormHelperText>
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
