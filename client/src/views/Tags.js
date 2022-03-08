import React, { useEffect, Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';

import { loadTags } from '../redux/Store';

const mapStateToProps = state => ({
	tags: state.tags
});

const mapDispatchToProps = {
	loadTags
};

const Tags = (props) => {

	const { tags, loadTags } = props;

	useEffect(() => { loadTags() }, [loadTags]);


	return (
		<Grid container spacing={4}>
			{tags.map(tag => (
				<Grid item xs={6} m={4} xl={2} key={tag.id}>
					<Button variant="outlined" color="primary" href={`/#/tags/${tag.id}`}>{tag.name}</Button>
				</Grid>
			))}
		</Grid>
	)

}

Tags.propTypes = {
	tags: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
