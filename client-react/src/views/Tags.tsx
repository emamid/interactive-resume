import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import useGetTags from '../api/hooks/useGetTags';

const Tags = () => {
	const { data: tags } = useGetTags();

	return (
		<Grid container spacing={1} rowSpacing="1em" sm={true}>
			{tags?.map((tag) => (
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

export default Tags;
