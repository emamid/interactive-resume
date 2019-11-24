import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

import { loadProject } from '../redux/Store';

import HTMLContent from '../components/HTMLContent';

const mapStateToProps = state => ({
    project: state.project
});

const mapDispatchToProps = {
	loadProject
};

class Project extends Component {

	static propTypes = {
		project: PropTypes.object
	};

	componentDidMount() {
		this.props.loadProject(this.props.match.params.projectID);
	}

	render() {
		return <div>
			<Typography align="left">{this.props.project.name} at {this.props.project.Employer.name}</Typography>
			<HTMLContent html={this.props.project.pageContent}/>
			<hr/>
			<Typography align="left">{JSON.stringify(this.props.project)}</Typography>
		</div>
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
