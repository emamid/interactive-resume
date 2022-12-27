import { MouseEventHandler } from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { Image } from '@/api/types';

import './ImageCard.css';

interface ImageCardProps {
	image: Image;
	onClick: MouseEventHandler;
}

const ImageCard = ({ image, onClick }: ImageCardProps) => {
	return (
		<Grid item xs={12} md={4} xl={3} key={image.filename}>
			<Card  className="card">
				<CardActionArea onClick={onClick}>
					<CardMedia
						src={`/thumbnails/${image.filename}`}
						title={image.caption}
						className="card-media"
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
