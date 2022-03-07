import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import YearRange from '../components/YearRange';

import { connect } from 'react-redux';

import { loadProjects } from '../redux/Store';

const mapStateToProps = state => ({
	projects: state.projects
});

const mapDispatchToProps = {
	loadProjects
};

class Projects extends Component {

	static propTypes = {
		projects: PropTypes.array.isRequired
	};

	componentDidMount() {
		this.props.loadProjects();
	}

	render() {
		const { projects } = this.props;
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
					{projects.map(project => (
						<TableRow key={project.id}>
							<TableCell><YearRange startDate={project.startDate} endDate={project.endDate} /></TableCell>
							<TableCell><a href={`/#/projects/${project.id}`}>{project.name}</a></TableCell>
							<TableCell>{project.isPersonal ? '' : <a href={`/#/employers/${project.employerID}`}>{project.Employer.name}</a>}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
