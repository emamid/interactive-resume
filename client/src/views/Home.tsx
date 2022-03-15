import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import useGetEmployers from '../api/hooks/useGetEmployers';
import useGetMyself from '../api/hooks/useGetMyself';

import HTMLContent from '../components/HTMLContent';
import YearRange from '../components/YearRange';

const Home = () => {
	const { status: employersStatus, data: employers, error: employersError, isFetching: isFetchingEmployers } = useGetEmployers();
	const { status: myselfStatus, data: myself, error: myselfError, isFetching: isFetchingMyself } = useGetMyself();

	const employerTable = (
		<Table size="small">
			<TableHead>
				<TableRow>
					<TableCell>Dates</TableCell>
					<TableCell>Company</TableCell>
					<TableCell>Position</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{employers?.map((employer) => (
					<TableRow key={employer.id}>
						<TableCell>
							<YearRange
								startDate={employer.startDate}
								endDate={employer.endDate}
							/>
						</TableCell>
						<TableCell>
							<a href={`/#/employers/${employer.id}`}>
								{employer.name}
							</a>
						</TableCell>
						<TableCell>
							<a href={`/#/employers/${employer.id}`}>
								{employer.position}
							</a>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
	const personalProjectTable = (
		<Table size="small">
			<TableHead>
				<TableRow>
					<TableCell>Dates</TableCell>
					<TableCell>Project</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{myself?.Projects.map((project: any) => (
					<TableRow key={project.id}>
						<TableCell>
							<YearRange
								startDate={project.startDate}
								endDate={project.endDate}
							/>
						</TableCell>
						<TableCell>
							<a href={`/#/projects/${project.id}`}>
								{project.name}
							</a>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
	return (
		<div>
			<HTMLContent html={myself?.pageContent} />
			<Typography>Employment History</Typography>
			{employerTable}
			<br />
			<Typography>Personal Projects</Typography>
			{personalProjectTable}
		</div>
	);
};

export default Home;
