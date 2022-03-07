import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

import { loadEmployer } from '../redux/Store';

import HTMLContent from '../components/HTMLContent';
import ReferenceList from '../components/ReferenceList';
import YearRange from '../components/YearRange';

const mapStateToProps = state => ({
	employer: state.employer
});

const mapDispatchToProps = {
	loadEmployer
};

class Employer extends Component {

	static propTypes = {
		employer: PropTypes.object
	};

	componentDidMount() {
		this.props.loadEmployer(this.props.match.params.employerID);
	}

	render() {
		const { employer } = this.props;
		return <div>
			<Typography component="h5" variant="h5">{employer.position} at {employer.name} <YearRange startDate={employer.startDate} endDate={employer.endDate} withParens={true} /></Typography>
			<HTMLContent html={this.props.employer.pageContent} />
			<br />
			<ReferenceList references={employer.References} />
		</div>
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Employer);