import Typography from '@mui/material/Typography';

import { RouteComponentProps } from 'react-router';

import useGetEmployer from '@/api/hooks/useGetEmployer';

import HTMLContent from '@/components/HTMLContent';
import ReferenceList from '@/components/ReferenceList';
import YearRange from '@/components/YearRange';

import './Employer.css';

interface EmployerRoute {
	employerID: string;
}

interface EmployerProps extends RouteComponentProps<EmployerRoute> {}

const Employer = ({ match }: EmployerProps) => {
	const { data: employer } = useGetEmployer(match.params.employerID);

	return (
		<div className="employer">
			<Typography component="h5" variant="h5">
				{employer?.position} at {employer?.name}{' '}
				<YearRange
					startDate={employer?.startDate}
					endDate={employer?.endDate}
					withParens={true}
				/>
			</Typography>
			<HTMLContent html={employer?.pageContent} />
			<br />
			<ReferenceList references={employer?.References || []} />
		</div>
	);
};

export default Employer;
