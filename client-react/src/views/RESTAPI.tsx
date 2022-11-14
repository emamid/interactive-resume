import { useRef, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import clsx from 'classnames';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';


const RESTAPI = () => {
	const [endpoint, setEndpoint] = useState<string>(localStorage.getItem('rest-endpoint') || 'employers');
	const [id, setID] = useState<string>(localStorage.getItem('rest-id') || '');
	return (
		<div className="rest-api">
			<div>
				<Typography component="h5" variant="h5" gutterBottom={true}>REST API</Typography>
				<div className="controls">
				<FormControl variant="standard" style={{ width: '15em' }}>
					<Select
						value={endpoint}
						onChange={(event) => {
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
				</div>
			</div>
		</div>
	);
};

export default RESTAPI;
