import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import Grid from '@material-ui/core/Grid';
import RoutableGridCard from '../components/RoutableGridCard';

import { loadTag } from '../redux/Store';

const mapStateToProps = state => ({
	tag: state.tag
});

const mapDispatchToProps = {
	loadTag
};

class Tag extends Component {

	static propTypes = {
		tag: PropTypes.object
	};

	componentDidMount() {
		this.props.loadTag(this.props.match.params.tagID);
	}

	render() {

		return <Grid container spacing={3}>
			{this.props.tag.Projects.map(project => (
				<RoutableGridCard key={project.id} to={`/projects/${project.id}`} title={project.name} subtitle={project.Employer.name} />
			))}
		</Grid>
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tag));