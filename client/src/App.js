import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
import MenuIcon from '@material-ui/icons/Menu';
import ProjectIcon from '@material-ui/icons/Build';
import TagIcon from '@material-ui/icons/LocalOffer';

import { Switch, Route, Redirect } from 'react-router-dom';

import RoutableListItem from './components/RoutableListItem';

import Home from './views/Home';
import Employer from './views/Employer';
import Project from './views/Project';
import Projects from './views/Projects';
import Tag from './views/Tag';
import Tags from './views/Tags';

import { Provider } from 'react-redux';
import { store, loadMyself } from './redux/Store';

const styles = theme => ({
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

class App extends Component {

	state = {
		menuDrawerOpen: false		
	};

	componentDidMount() {
		store.dispatch(loadMyself());
	}

	openMenuDrawer = () => {
		this.setState({
			menuDrawerOpen: true
		});
	};

	closeMenuDrawer = () => {
		this.setState({
			menuDrawerOpen: false
		});
	};

	render() {
		const { classes } = this.props;

		const { menuDrawerOpen } = this.state;

		const menuDrawer = (
			<Drawer
				variant='temporary'
				anchor='left'
				open={menuDrawerOpen}
				onClose={this.closeMenuDrawer}
			>
				<List>
					<RoutableListItem to='/' icon={<HomeIcon />} text={'Home'} onNavigated={this.closeMenuDrawer}></RoutableListItem>
					<RoutableListItem to='/projects' icon={<ProjectIcon />} text={'Projects'} onNavigated={this.closeMenuDrawer}></RoutableListItem>
					<RoutableListItem to='/tags' icon={<TagIcon />} text={'Tags'} onNavigated={this.closeMenuDrawer}></RoutableListItem>
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
									onClick={this.openMenuDrawer}
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
								<Redirect to="/"/>
							</Switch>
						</main>        
					</div>
				</div>
			</Provider>
		)
	}
}

App.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
