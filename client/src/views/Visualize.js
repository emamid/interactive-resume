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
		return (
			<BubbleChart data={this.props.projectTags} colorBy="category" groupBy="layer" onclick={tagID => this.props.history.push('/tags/'+tagID)}/>
		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visualize));
