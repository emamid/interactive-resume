import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

import { withRouter } from 'react-router'

const RoutableGridCard = (props) => {
	const { title, subtitle, history, to, onClick, onNavigated } = props;
	return (
        <Grid item xs={3}>
            <Card>
                <CardActionArea>
                    <CardContent onClick={(event) => {
                        onClick && onClick(event);
                        history.push(to);
                        onNavigated && onNavigated(to);
                    }}>
                        <Typography component="h5" variant="h5">{title}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">{subtitle}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
	)
}

RoutableGridCard.propTypes = {
	onClick: PropTypes.func,
	onNavigated: PropTypes.func,
    title: PropTypes.string,
    subtitle: PropTypes.string,
	to: PropTypes.string.isRequired,
}

export default withRouter(RoutableGridCard)