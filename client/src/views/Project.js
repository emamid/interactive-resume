import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

import { loadProject } from '../redux/Store';

import HTMLContent from '../components/HTMLContent';
import YearRange from '../components/YearRange';
import ImageCard from '../components/ImageCard';
import ImageDialog from '../components/ImageDialog';

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

	state = {
		dialogImage: null
	};

	componentDidMount() {
		this.props.loadProject(this.props.match.params.projectID);
	}

	render() {
		const { project } = this.props;
		return <div>
			<Typography component="h5" variant="h5" gutterBottom={true}>
				{project.name} at <a href={`/employers/${project.employerID}`}>{project.Employer.name}</a> <YearRange startDate={project.startDate} endDate={project.endDate}/>
			</Typography>
			<div>
				{project.Tags.map(tag => (
					<Chip label={tag.name} component="a" href={`/tags/${tag.id}`} clickable variant="outlined" key={tag.id}/>
				))}
			</div>
			<HTMLContent html={project.pageContent}/>
			<ImageDialog image={this.state.dialogImage} onClose={()=>{this.setState({dialogImage:null})}}/>
			<Grid container spacing={3}>
				{project.Images.map(image => (
					<ImageCard image={image} key={image.filename} onClick={()=>{this.setState({dialogImage: {...image}})}}/>
				))}			
			</Grid>
		</div>
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
