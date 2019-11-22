import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

const RoutableListItem = (props) => {
	const { icon, text, history, to, onClick, onNavigated } = props;
	return (
		<ListItem button 
			onClick={(event) => {
				onClick && onClick(event);
				history.push(to);
				onNavigated && onNavigated(to);
			}}
		>
			<ListItemIcon>
			{icon}
			</ListItemIcon>
			<ListItemText primary={text} />
		</ListItem>          
	)
}

RoutableListItem.propTypes = {
	icon: PropTypes.element,
	onNavigated: PropTypes.func,
	text: PropTypes.string,
	to: PropTypes.string.isRequired,
}

export default withRouter(RoutableListItem)