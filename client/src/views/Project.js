import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import { connect } from 'react-redux';

import { loadProject } from '../redux/Store';

import HTMLContent from '../components/HTMLContent';
import YearRange from '../components/YearRange';

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
			<Typography component="h5" variant="h5">{this.props.project.name} at <a href={`/employers/${this.props.project.employerID}`}>{this.props.project.Employer.name}</a> <YearRange startDate={this.props.project.startDate} endDate={this.props.project.endDate}/></Typography>
			<div>
				{this.props.project.Tags.map(tag => (
					<Chip label={tag.name} component="a" href={`/tags/${tag.id}`} clickable variant="outlined" key={tag.id}/>
				))}
			</div>
			<HTMLContent html={this.props.project.pageContent}/>
			<Grid container spacing={3}>
				{/* {this.props.tag.Images.map(Image => (
					<RoutableGridCard key={project.id} to={`/projects/${project.id}`} title={project.name} subtitle={project.Employer.name}/>
				))}			 */}
			</Grid>
		</div>
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
