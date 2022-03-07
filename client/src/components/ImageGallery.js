import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ImageCard from '../components/ImageCard';

const ImageGallery = (props) => {

	const { images, onClick } = props;

	if (images && images.length) {
		return (
			<div>
				<Typography component="h6" variant="h6">Gallery</Typography>
				<Grid container spacing={3}>
					{images.map(image => (
						<ImageCard image={image} key={image.filename} onClick={event => { onClick(image) }} />
					))}
				</Grid>
			</div>
		)
	} else {
		return '';
	}
}

ImageGallery.propTypes = {
	images: PropTypes.array,
	onClick: PropTypes.func
}

export default ImageGallery;