import React, { useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';

import { loadTags } from '../redux/Store';

export interface TagsProps {
	tags: any[];
	loadTags: Function;
}

const mapStateToProps = (state: any) => ({
	tags: state.tags
});

const mapDispatchToProps = {
	loadTags
};

const Tags = ({ tags, loadTags }: TagsProps) => {
	useEffect(() => {
		loadTags();
	}, [loadTags]);

	return (
		<Grid container spacing={4}>
			{tags.map((tag) => (
				//@ts-ignore TODO: Found out what the type mismatch is here
				<Grid item xs={6} m={4} xl={2} key={tag.id}>
					<Button
						variant="outlined"
						color="primary"
						href={`/#/tags/${tag.id}`}
					>
						{tag.name}
					</Button>
				</Grid>
			))}
		</Grid>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
