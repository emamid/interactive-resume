import React, { useEffect } from 'react';

import Typography from '@mui/material/Typography';

import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { loadEmployer } from '../redux/Store';

import HTMLContent from '../components/HTMLContent';
import ReferenceList from '../components/ReferenceList';
import YearRange from '../components/YearRange';

interface EmployerRoute {
	employerID: string;
}

interface EmployerProps extends RouteComponentProps<EmployerRoute> {
	employer: any;
	loadEmployer: Function;
}

const mapStateToProps = (state: any) => ({
	employer: state.employer
});

const mapDispatchToProps = {
	loadEmployer
};

const Employer = ({ employer, loadEmployer, match }: EmployerProps) => {
	useEffect(() => {
		loadEmployer(match.params.employerID);
	}, [loadEmployer, match]);

	return (
		<div>
			<Typography component="h5" variant="h5">
				{employer.position} at {employer.name}{' '}
				<YearRange
					startDate={employer.startDate}
					endDate={employer.endDate}
					withParens={true}
				/>
			</Typography>
			<HTMLContent html={employer.pageContent} />
			<br />
			<ReferenceList references={employer.References} />
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Employer);
