import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import useGetProjects from '../api/hooks/useGetProjects';

import YearRange from '../components/YearRange';

const Projects = () => {
	const { status: projectsStatus, data: projects, error: projectsError, isFetching: isFetchingProjects } = useGetProjects();

	return (
		<Table size="small">
			<TableHead>
				<TableRow>
					<TableCell>Dates</TableCell>
					<TableCell>Project</TableCell>
					<TableCell>Company</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{projects?.map((project) => (
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
						<TableCell>
							{project.isPersonal ? (
								''
							) : (
								<a href={`/#/employers/${project.employerID}`}>
									{project.Employer.name}
								</a>
							)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default Projects;
