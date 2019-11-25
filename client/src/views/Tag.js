import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';

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
		return <Typography>Tag = {JSON.stringify(this.props.tag)}</Typography>
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Tag);