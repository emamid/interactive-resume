import { useState } from 'react';

import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import { RouteComponentProps } from 'react-router';

import useGetProject from '@/api/hooks/useGetProject';

import HTMLContent from '@/components/HTMLContent';
import YearRange from '@/components/YearRange';
import ImageGallery from '@/components/ImageGallery';
import ImageDialog from '@/components/ImageDialog';

import { Image } from '@/api/types';

interface ProjectRoute {
	projectID: string;
}

interface ProjectProps extends RouteComponentProps<ProjectRoute> {}

const Project = ({ match }: ProjectProps) => {
	const { data: project } = useGetProject(match.params.projectID);

	const [dialogImage, setDialogImage] = useState<Image | undefined>(undefined);

	const employerText = project?.isPersonal ? (
		''
	) : (
		<span>
			{' '}
			at{' '}
			<a href={`./#/employers/${project?.employerID}`}>
				{project?.Employer.name}
			</a>{' '}
			<YearRange
				startDate={project?.startDate}
				endDate={project?.endDate}
				withParens={true}
			/>
		</span>
	);
	return (
		<div style={{ overflow: 'auto', height: '100%' }}>
			<Typography component="h5" variant="h5" gutterBottom={true}>
				{project?.name}
				{employerText}
			</Typography>
			<div>
				{project?.Tags.map(tag => (
					<Chip
						label={tag.name}
						component="a"
						href={`./#/tags/${tag.id}`}
						clickable
						variant="outlined"
						key={tag.id}
					/>
				))}
			</div>
			<HTMLContent html={project?.pageContent} />
			<ImageDialog
				image={dialogImage}
				onClose={() => {
					setDialogImage(undefined);
				}}
			/>
			{/* <ImageGallery images={project.Images} onClick={(image) => { this.setState({ dialogImage: { ...image } }) }} /> */}
			<ImageGallery
				images={project?.Images || []}
				onClick={image => {
					setDialogImage({ ...image });
				}}
			/>
		</div>
	);
};

export default Project;
