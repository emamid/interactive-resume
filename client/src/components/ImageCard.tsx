import React, { MouseEventHandler } from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface ImageCardProps {
	image: any;
	onClick: MouseEventHandler;
}

const ImageCard = ({ image, onClick }: ImageCardProps) => {
	return (
		<Grid item xs={12} md={4} xl={3} key={image.id}>
			<Card style={{ textAlign: 'center' }}>
				<CardActionArea onClick={onClick}>
					<CardMedia
						src={`/thumbnails/${image.filename}`}
						title={image.caption}
						style={{
							maxHeight: 108,
							maxWidth: 192,
							display: 'block',
							marginLeft: 'auto',
							marginRight: 'auto'
						}}
						component="img"
					/>
					<CardContent>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
						>
							{image.caption}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
};

export default ImageCard;
