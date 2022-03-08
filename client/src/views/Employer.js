import React, { useEffect } from 'react';
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

const Employer = (props) => {

	const { employer, loadEmployer, match } = props;

	useEffect(() => { loadEmployer(match.params.employerID) }, [loadEmployer, match])

	return <div>
		<Typography component="h5" variant="h5">{employer.position} at {employer.name} <YearRange startDate={employer.startDate} endDate={employer.endDate} withParens={true} /></Typography>
		<HTMLContent html={employer.pageContent} />
		<br />
		<ReferenceList references={employer.References} />
	</div>

}

Employer.propTypes = {
	employer: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Employer);