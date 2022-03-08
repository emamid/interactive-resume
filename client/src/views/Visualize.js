import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import BubbleChart from '../components/BubbleChart';

import { connect } from 'react-redux';

import { loadProjectTags } from '../redux/Store';

const mapStateToProps = state => ({
	projectTags: state.projectTags
});

const mapDispatchToProps = {
	loadProjectTags
};

const Visualize = (props) => {

	const { projectTags, loadProjectTags, history } = props;

	useEffect(() => {
		loadProjectTags();
	}, [loadProjectTags]);

	return (<div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
		<div>Top bar</div>
		<div style={{ flexGrow: 1 }}>
			<BubbleChart data={projectTags} colorBy="category" groupBy="layer" onclick={tagID => history.push('/tags/' + tagID)} />
		</div>
		<div>Bottom bar</div>
	</div>
	)
}

Visualize.propTypes = {
	projectTags: PropTypes.array.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visualize));
