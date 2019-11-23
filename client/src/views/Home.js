import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { loadEmployers } from '../redux/Store';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const mapStateToProps = state => ({
    myself: state.myself,
    employers: state.employers
});

const mapDispatchToProps = {
	loadEmployers
};

class Home extends Component {

	static propTypes = {
		myself: PropTypes.object.isRequired,
		employers: PropTypes.array.isRequired
	};
	
	componentDidMount() {
		this.props.loadEmployers();
	}

	render() {
		const employerTable = (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Dates</TableCell>
						<TableCell>Company</TableCell>
						<TableCell>Position</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{this.props.employers.map(employer => (
						<TableRow key={employer.id}>
							<TableCell>{new Date(employer.startDate).getFullYear()} - {new Date(employer.endDate).getFullYear()}</TableCell>
							<TableCell>{employer.name}</TableCell>
							<TableCell>{employer.position}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		);
		return (
			<Paper>
				<div className="MuiTypography-root MuiTypography-body1" dangerouslySetInnerHTML={{__html: this.props.myself.homeHTML}}/>
				{employerTable}
			</Paper>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);