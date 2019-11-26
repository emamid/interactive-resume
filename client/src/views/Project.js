import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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
				{this.props.project.Images.map(image => (
					<Grid item xs={2} key={image.id}>
						<Card>
							<CardActionArea>								
								<CardMedia image={`http://localhost:3000/thumbnails/${image.filename}`} title={image.caption} style={{height:108}}/>
								<CardContent>									
									<Typography variant="body2" color="textSecondary" component="p">{image.caption}</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				))}			
			</Grid>
		</div>
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
