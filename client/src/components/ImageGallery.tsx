import React, { MouseEventHandler } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ImageCard from '../components/ImageCard';

export interface ImageGalleryProps {
	images: any[];
	onClick: MouseEventHandler;
}

const ImageGallery = ({ images, onClick }: ImageGalleryProps) => {
	if (images && images.length) {
		return (
			<div>
				<Typography component="h6" variant="h6">
					Gallery
				</Typography>
				<Grid container spacing={3}>
					{images.map((image) => (
						<ImageCard
							image={image}
							key={image.filename}
							onClick={(event) => {
								onClick(image);
							}}
						/>
					))}
				</Grid>
			</div>
		);
	} else {
		return '';
	}
};

export default ImageGallery;
