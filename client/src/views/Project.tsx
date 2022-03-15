import React, { useEffect, useState } from 'react';

import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { loadProject } from '../redux/Store';

import HTMLContent from '../components/HTMLContent';
import YearRange from '../components/YearRange';
import ImageGallery from '../components/ImageGallery';
import ImageDialog from '../components/ImageDialog';

interface ProjectRoute {
	projectID: string;
}

interface ProjectProps extends RouteComponentProps<ProjectRoute> {
	project: any;
	loadProject: Function;
}

const mapStateToProps = (state: any) => ({
	project: state.project
});

const mapDispatchToProps = {
	loadProject
};

const Project = ({ project, loadProject, match }: ProjectProps) => {
	useEffect(() => {
		loadProject(match.params.projectID);
	}, [loadProject, match.params.projectID]);

	const [dialogImage, setDialogImage] = useState(null);

	const employerText = project.isPersonal ? (
		''
	) : (
		<span>
			{' '}
			at{' '}
			<a href={`/#/employers/${project.employerID}`}>
				{project.Employer.name}
			</a>{' '}
			<YearRange
				startDate={project.startDate}
				endDate={project.endDate}
				withParens={true}
			/>
		</span>
	);
	return (
		<div>
			<Typography component="h5" variant="h5" gutterBottom={true}>
				{project.name}
				{employerText}
			</Typography>
			<div>
				{project.Tags.map((tag: any) => (
					<Chip
						label={tag.name}
						component="a"
						href={`/#/tags/${tag.id}`}
						clickable
						variant="outlined"
						key={tag.id}
					/>
				))}
			</div>
			<HTMLContent html={project.pageContent} />
			<ImageDialog
				image={dialogImage}
				onClose={() => {
					setDialogImage(null);
				}}
			/>
			{/* <ImageGallery images={project.Images} onClick={(image) => { this.setState({ dialogImage: { ...image } }) }} /> */}
			<ImageGallery
				images={project.Images}
				onClick={(image: any) => {
					setDialogImage({ ...image });
				}}
			/>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
