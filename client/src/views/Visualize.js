import React, { Component } from 'react';
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

class Visualize extends Component {

	static propTypes = {
		projectTags: PropTypes.array.isRequired
	};

	componentDidMount() {
		this.props.loadProjectTags();
	}

	render() {
		return (<div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
			<div>Top bar</div>
			<div style={{ flexGrow: 1 }}>
				<BubbleChart data={this.props.projectTags} colorBy="category" groupBy="layer" onclick={tagID => this.props.history.push('/tags/' + tagID)} />
			</div>
			<div>Bottom bar</div>
		</div>
		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visualize));
