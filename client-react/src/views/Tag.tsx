import { withRouter, RouteComponentProps } from 'react-router';

import useGetTag from '@/api/hooks/useGetTag';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import RoutableGridCard from '@/components/RoutableGridCard';

interface TagRoute {
	tagID: string;
}

export interface TagProps extends RouteComponentProps<TagRoute> {}

const Tag = ({ match }: TagProps) => {
	const { data: tag } = useGetTag(match.params.tagID);

	return (
		<div className="scrollable-view">
			<Typography component="h5" variant="h5" gutterBottom={true}>
				{tag?.name}
			</Typography>
			<Grid container spacing={3}>
				{tag?.Projects.map((project: any) => (
					<RoutableGridCard
						key={project.id}
						to={`/projects/${project.id}`}
						title={project.name}
						subtitle={project.Employer.name}
					/>
				))}
			</Grid>
		</div>
	);
};

export default withRouter(Tag);
