import React, { MouseEventHandler } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ImageCard from '../components/ImageCard';

interface ImageGalleryProps {
	images: any[];
	onClick: Function;
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
		return <span/>;
	}
};

export default ImageGallery;
