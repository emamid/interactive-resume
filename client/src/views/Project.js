import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

import { loadProject } from '../redux/Store';

import HTMLContent from '../components/HTMLContent';
import YearRange from '../components/YearRange';
import ImageGallery from '../components/ImageGallery';
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
		const employerText = project.isPersonal ? '' : <span> at <a href={`/#/employers/${project.employerID}`}>{project.Employer.name}</a> <YearRange startDate={project.startDate} endDate={project.endDate} withParens={true} /></span>;
		return <div>
			<Typography component="h5" variant="h5" gutterBottom={true}>
				{project.name}{employerText}
			</Typography>
			<div>
				{project.Tags.map(tag => (
					<Chip label={tag.name} component="a" href={`/#/tags/${tag.id}`} clickable variant="outlined" key={tag.id} />
				))}
			</div>
			<HTMLContent html={project.pageContent} />
			<ImageDialog image={this.state.dialogImage} onClose={() => { this.setState({ dialogImage: null }) }} />
			<ImageGallery images={project.Images} onClick={(image) => { this.setState({ dialogImage: { ...image } }) }} />
		</div>
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
