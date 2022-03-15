import React, { MouseEventHandler } from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

import { withRouter, RouteComponentProps } from 'react-router';

interface RoutableGridCardProps extends RouteComponentProps {
	title: string;
	subtitle: string;
	to: string;
	onClick?: MouseEventHandler;
	onNavigated?: Function;
}

const RoutableGridCard = ({
	title,
	subtitle,
	history,
	to,
	onClick,
	onNavigated
}: RoutableGridCardProps) => {
	return (
		<Grid item xs={12} md={4} xl={3}>
			<Card>
				<CardActionArea>
					<CardContent
						onClick={(event) => {
							onClick && onClick(event);
							history.push(to);
							onNavigated && onNavigated(to);
						}}
					>
						<Typography component="h5" variant="h5">
							{title}
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							{subtitle}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
};

export default withRouter(RoutableGridCard);
