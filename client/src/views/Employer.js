import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

import { loadEmployer } from '../redux/Store';

import HTMLContent from '../components/HTMLContent';
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
		return <div>
			<Typography component="h5" variant="h5">{this.props.employer.position} at {this.props.employer.name} <YearRange startDate={this.props.employer.startDate} endDate={this.props.employer.endDate} withParens={true}/></Typography>
			<HTMLContent html={this.props.employer.pageContent}/>
		</div>
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Employer);