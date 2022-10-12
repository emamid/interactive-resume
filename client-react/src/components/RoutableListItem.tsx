import { MouseEventHandler } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { withRouter, RouteComponentProps } from 'react-router';

import NavigateEvent from './NavigateEvent';

interface RoutableListItemProps extends RouteComponentProps {
	icon: JSX.Element;
	text: string;
	to: string;
	onClick?: MouseEventHandler;
	onNavigated?: NavigateEvent;
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
