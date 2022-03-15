import React, { Component, useEffect, useState } from 'react';

import './App.css';

import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import HomeIcon from '@material-ui/icons/Home';
import MapIcon from '@material-ui/icons/Map';
import MenuIcon from '@material-ui/icons/Menu';
import ProjectIcon from '@material-ui/icons/Build';
import TagIcon from '@material-ui/icons/LocalOffer';
import VisualizeIcon from '@material-ui/icons/BubbleChart';

import { Switch, Route, Redirect } from 'react-router-dom';

import RoutableListItem from './components/RoutableListItem';

import Home from './views/Home';
import Employer from './views/Employer';
import Map from './views/Map';
import Project from './views/Project';
import Projects from './views/Projects';
import Tag from './views/Tag';
import Tags from './views/Tags';
import Visualize from './views/Visualize';

import { Provider } from 'react-redux';
import { store, loadMyself } from './redux/Store';

const styles = (theme: any) => ({
	appFrame: {
		height: '100%',
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
		padding: theme.spacing(3),
		marginTop: 64
	},
});

const App = ({ classes } : any) => {

	const [ menuDrawerOpen, setMenuDrawerOpen ] = useState(false);

	useEffect(() => {
		store.dispatch(loadMyself());
	})

	const closeMenuDrawer = () => {
		setMenuDrawerOpen(false)
	}

	const menuDrawer = (
		<Drawer
			variant='temporary'
			anchor='left'
			open={menuDrawerOpen}
			onClose={closeMenuDrawer}
		>
			<List>
				<RoutableListItem to='/' icon={<HomeIcon />} text={'Home'} onNavigated={closeMenuDrawer}></RoutableListItem>
				<RoutableListItem to='/projects' icon={<ProjectIcon />} text={'Projects'} onNavigated={closeMenuDrawer}></RoutableListItem>
				<RoutableListItem to='/tags' icon={<TagIcon />} text={'Tags'} onNavigated={closeMenuDrawer}></RoutableListItem>
				<RoutableListItem to='/visualize' icon={<VisualizeIcon />} text={'Visualize'} onNavigated={closeMenuDrawer}></RoutableListItem>
				<RoutableListItem to='/map' icon={<MapIcon />} text={'Map'} onNavigated={closeMenuDrawer}></RoutableListItem>
			</List>
		</Drawer>
	);    

	return (
		<Provider store={store}>
			<div className='App'>
				<div className={classes.appFrame}>
					<AppBar className={classNames(classes.appBar)} position="static">
						<Toolbar disableGutters={true}>
							<IconButton
								color='inherit'
								onClick={() => setMenuDrawerOpen(true)}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant='h6' color='inherit' noWrap>Interactive Resume</Typography>
						</Toolbar>
					</AppBar>
					{menuDrawer}
					<main className={classNames(classes.content)}>
						<Switch>
							<Route exact path='/' component={Home}/>
							<Route exact path='/projects' component={Projects}/>
							<Route path='/projects/:projectID' component={Project}/>
							<Route path='/employers/:employerID' component={Employer}/>
							<Route exact path='/tags' component={Tags}/>
							<Route path='/tags/:tagID' component={Tag}/>
							<Route path='/visualize' component={Visualize}/>
							<Route path='/map' component={Map}/>
							<Redirect to="/"/>
						</Switch>
					</main>        
				</div>
			</div>
		</Provider>
	)

}

//@ts-ignore
export default withStyles(styles)(App); //TODO: Change after upgrading Material UI

