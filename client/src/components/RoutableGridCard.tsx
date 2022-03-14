import React, { MouseEventHandler } from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

import { withRouter, RouteComponentProps } from 'react-router';

export interface RoutableGridCardProps extends RouteComponentProps {
	title: string;
	subtitle: string;
	to: string;
	onClick: MouseEventHandler;
	onNavigated: Function;
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
