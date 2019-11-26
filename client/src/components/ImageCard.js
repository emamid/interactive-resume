import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const ImageCard = (props) => {
	const { image } = props;
	return (
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
	)
}

ImageCard.propTypes = {
	onClicked: PropTypes.func
}

export default ImageCard;