import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import { loadEmployers } from '../redux/Store';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import HTMLContent from '../components/HTMLContent';
import YearRange from '../components/YearRange';

export interface HomeProps {
	myself: any;
	employers: any[];
	loadEmployers: Function;
}

const mapStateToProps = (state: any) => ({
	myself: state.myself,
	employers: state.employers
});

const mapDispatchToProps = {
	loadEmployers
};

const Home = ({ myself, employers, loadEmployers }: HomeProps) => {
	useEffect(() => {
		loadEmployers();
	}, [loadEmployers]);

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
				{employers.map((employer) => (
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
				{myself.Projects.map((project: any) => (
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
			<HTMLContent html={myself.pageContent} />
			<Typography>Employment History</Typography>
			{employerTable}
			<br />
			<Typography>Personal Projects</Typography>
			{personalProjectTable}
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
