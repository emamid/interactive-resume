import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

import { loadEmployer } from '../redux/Store';

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
		return <Typography>{'Employer placeholder'} {this.props.match.params.employerID} {JSON.stringify(this.props.employer)}</Typography>
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Employer);