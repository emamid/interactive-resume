import React, { useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

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
		<Grid container spacing={1} rowSpacing="1em" sm={true}>
			{tags.map((tag) => (
				<Grid item key={tag.id}>
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
