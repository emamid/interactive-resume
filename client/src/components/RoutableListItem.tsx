import React, { MouseEventHandler } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { withRouter, RouteComponentProps } from 'react-router';

interface RoutableListItemProps extends RouteComponentProps {
	icon: any;
	text: string;
	to: string;
	onClick?: MouseEventHandler;
	onNavigated?: Function;
}

const RoutableListItem = ({
	icon,
	text,
	history,
	to,
	onClick,
	onNavigated
}: RoutableListItemProps) => {
	return (
		<ListItem
			button
			onClick={(event) => {
				onClick && onClick(event);
				history.push(to);
				onNavigated && onNavigated(to);
			}}
		>
			<ListItemIcon>{icon}</ListItemIcon>
			<ListItemText primary={text} />
		</ListItem>
	);
};

export default withRouter(RoutableListItem);
