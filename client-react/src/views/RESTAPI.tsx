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

import './RESTAPI.css';

const idEndpoints = ['employers', 'projects', 'tags'];
const helperText: Record<string, string> = {
	'employers': 'employerID',
	'projects': 'projectID',
	'tags': 'tagID',
}

const allowsID = (endpoint: string) => idEndpoints.indexOf(endpoint) !== -1;

const RESTAPI = () => {
	const [lastURL, setLastURL] = useState('');
	const [endpoint, setEndpoint] = useState<string>(localStorage.getItem('rest-endpoint') || 'employers');
	const [id, setID] = useState<string>(localStorage.getItem('rest-id') || '');
	const [data, setData] = useState<any>();
	const [statusMessage, setStatusMessage] = useState<string>();
	const [selectedEndpoint, setSelectedEndpoint] = useState<string>(localStorage.getItem('rest-endpoint') || 'employers');
	const [selectedID, setSelectedID] = useState<string>(localStorage.getItem('rest-id') || '');

	const makeRequest = async () => {
		try {
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

	const clearSelectedID = () => setSelectedID('');

	const requestClicked = () => {
		setEndpoint(selectedEndpoint);
		setID(selectedID);
	}

	const itemClicked = (itemID: string) => {
		setSelectedEndpoint(endpoint);
		setSelectedID(itemID);
		setID(itemID);
	}

	useEffect(() => {
		makeRequest();
	}, [endpoint, id]);

	return (
		<div className="rest-api">
			<div>
				<Typography component="h5" variant="h5" gutterBottom={true}>REST API</Typography>
				<div className="controls">
					<FormControl variant="standard" className="endpoint-field">
						<InputLabel>Endpoint</InputLabel>
						<Select
							value={selectedEndpoint}
							onChange={event => {
								setSelectedEndpoint(event.target.value || '');
								clearSelectedID();
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
					{allowsID(endpoint) && <FormControl variant="standard" className="id-field">
						<InputLabel>id</InputLabel>
						<Input
							value={selectedID}
							onChange={event => {
								setSelectedID(event.target.value || '');
							}}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										edge="end"
										onClick={clearSelectedID}
									>
										<DeleteIcon />
									</IconButton>
								</InputAdornment>
							}
						/>
						<FormHelperText>{helperText[endpoint]}</FormHelperText>
					</FormControl>}
				</div>
				<Button variant="contained" className="request-button" onClick={requestClicked}>Request</Button>
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
