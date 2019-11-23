import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
			<Grid container spacing={3}>
				{this.props.tags.map(tag => (
					<Grid item xs={2} key={tag.id}>
						<Paper>{tag.name}</Paper>
					</Grid>
				))}
			</Grid>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
