import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
		return (
			<BubbleChart data={this.props.projectTags} colorBy="category" groupBy="layer"/>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Visualize);
