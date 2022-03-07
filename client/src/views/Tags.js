import React, { Component } from 'react';
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

class Tags extends Component {

	static propTypes = {
		tags: PropTypes.array.isRequired
	};

	componentDidMount() {
		this.props.loadTags();
	}

	render() {
		return (
			<Grid container spacing={4}>
				{this.props.tags.map(tag => (
					<Grid item xs={6} m={4} xl={2} key={tag.id}>
						<Button variant="outlined" color="primary" href={`/#/tags/${tag.id}`}>{tag.name}</Button>
					</Grid>
				))}
			</Grid>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
