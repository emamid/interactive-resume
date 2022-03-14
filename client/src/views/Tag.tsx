import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import RoutableGridCard from '../components/RoutableGridCard';

import { loadTag } from '../redux/Store';

interface TagRoute {
	tagID: string;
}

export interface TagProps extends RouteComponentProps<TagRoute> {
	tag: any;
	loadTag: Function;
}

const mapStateToProps = (state: any) => ({
	tag: state.tag
});

const mapDispatchToProps = {
	loadTag
};

const Tag = ({ tag, loadTag, match }: TagProps) => {
	useEffect(() => {
		loadTag(match.params.tagID);
	}, [loadTag, match.params.tagID]);

	return (
		<div>
			<Typography component="h5" variant="h5" gutterBottom={true}>
				{tag.name}
			</Typography>
			<Grid container spacing={3}>
				{tag.Projects.map((project: any) => (
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tag));
