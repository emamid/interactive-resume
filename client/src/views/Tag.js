import React, { useEffect } from 'react';
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

const Tag = (props) => {

	const { tag, loadTag, match } = props;

	useEffect(() => { loadTag(match.params.tagID) }, [loadTag, match.params.tagID])

	return <Grid container spacing={3}>
		{tag.Projects.map(project => (
			<RoutableGridCard key={project.id} to={`/projects/${project.id}`} title={project.name} subtitle={project.Employer.name} />
		))}
	</Grid>

}

Tag.propTypes = {
	tag: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tag));