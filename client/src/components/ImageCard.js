import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const ImageCard = (props) => {
	const { image, onClick } = props;
	return (
		<Grid item xs={12} md={4} xl={3} key={image.id}>
			<Card style={{ textAlign: 'center' }}>
				<CardActionArea onClick={onClick}>
					<CardMedia src={`/thumbnails/${image.filename}`} title={image.caption} style={{ maxHeight: 108, maxWidth: 192, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} component="img" />
					<CardContent>
						<Typography variant="body2" color="textSecondary" component="p">{image.caption}</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	)
}

ImageCard.propTypes = {
	image: PropTypes.object,
	onClick: PropTypes.func
}

export default ImageCard;