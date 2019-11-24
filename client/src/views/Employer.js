import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

import { loadEmployer } from '../redux/Store';

import HTMLContent from '../components/HTMLContent';

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
		return <div>
			<Typography>{this.props.employer.position} at {this.props.employer.name} ({this.props.employer.startDate} to {this.props.employer.endDate})</Typography>
			<HTMLContent html={this.props.employer.pageContent}/>
		</div>
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Employer);