import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';

import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
	appFrame: {
		height: 800,
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		width: '100%',
	},
	appBar: {
		position: 'absolute'
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		marginTop: 64
	},
});

class App extends Component {

	render() {
		const { classes } = this.props;
		return (
			<div className='App'>
				<div className={classes.appFrame}>
					<AppBar className={classNames(classes.appBar)}>
						<Toolbar disableGutters={true}>
							<IconButton
								color='inherit'
								// onClick={this.openMenuDrawer}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant='h6' color='inherit' noWrap>Interactive Resume</Typography>
						</Toolbar>
					</AppBar>
					{/* {menuDrawer} */}
					<main className={classNames(classes.content)}>
						{/* {body} */}
					</main>        
				</div>
			</div>
		)
	}
}

App.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
