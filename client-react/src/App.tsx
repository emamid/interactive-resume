import { useState } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css';

import {
	ThemeProvider,
	Theme,
	StyledEngineProvider,
	createTheme
} from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';

import classNames from 'classnames';

import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import HomeIcon from '@mui/icons-material/Home';
// import MapIcon from '@mui/icons-material/Map';
import MenuIcon from '@mui/icons-material/Menu';
import ProjectIcon from '@mui/icons-material/Build';
import TagIcon from '@mui/icons-material/LocalOffer';
import VisualizeIcon from '@mui/icons-material/BubbleChart';

import { Switch, Route, Redirect } from 'react-router-dom';

import RoutableListItem from '@/components/RoutableListItem';

import Home from '@/views/Home';
import Employer from '@/views/Employer';
// import Map from './views/Map';
import Project from '@/views/Project';
import Projects from '@/views/Projects';
import Tag from '@/views/Tag';
import Tags from '@/views/Tags';
import Visualize from '@/views/Visualize';

import useGetMyself from '@/api/hooks/useGetMyself';

declare module '@mui/styles/defaultTheme' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface DefaultTheme extends Theme {}
}

const theme = createTheme({
	palette: {
		primary: {
			main: '#00d8ff'
		}
	}
});

const useStyles = makeStyles((theme) => ({
	appFrame: {
		height: '100%',
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		width: '100%'
	},
	appBar: {
		position: 'absolute'
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
		marginTop: 64,
		width: '100%'
	}
}));

const App = () => {
	const classes = useStyles();

	const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);

	useGetMyself();

	const closeMenuDrawer = () => {
		setMenuDrawerOpen(false);
	};

	const menuDrawer = (
		<Drawer
			variant="temporary"
			anchor="left"
			open={menuDrawerOpen}
			onClose={closeMenuDrawer}
		>
			<List>
				<RoutableListItem
					to="/"
					icon={<HomeIcon />}
					text={'Home'}
					onNavigated={closeMenuDrawer}
				/>
				<RoutableListItem
					to="/projects"
					icon={<ProjectIcon />}
					text={'Projects'}
					onNavigated={closeMenuDrawer}
				/>
				<RoutableListItem
					to="/tags"
					icon={<TagIcon />}
					text={'Tags'}
					onNavigated={closeMenuDrawer}
				/>
				<RoutableListItem
					to="/visualize"
					icon={<VisualizeIcon />}
					text={'Visualize'}
					onNavigated={closeMenuDrawer}
				/>
				{/* <RoutableListItem
					to="/map"
					icon={<MapIcon />}
					text={'Map'}
					onNavigated={closeMenuDrawer}
				/> */}
				<Divider />
				<ListItem
					button
					onClick={() => {
						window.location.href = '/svelte_client'
					}}
						>
					<img className="client-logo" alt="logo" src="/icons/svelte_logo.svg" height="24px" width="24px" />
					<ListItemText primary="Svelte" />
				</ListItem>
				<ListItem
					button
					onClick={() => {
						window.location.href = '/vue3_client'
					}}
						>
					<img className="client-logo" alt="logo" src="/icons/vue_logo.svg" height="24px" width="24px" />
					<ListItemText primary="Vue 3" />
				</ListItem>
			</List>
		</Drawer>
	);

	return (
		<div className="App">
			<div className={classes.appFrame}>
				<AppBar
					className={classNames(classes.appBar)}
					position="static"
				>
					<Toolbar disableGutters={true}>
						<IconButton
							color="inherit"
							onClick={() => setMenuDrawerOpen(true)}
							size="large"
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" noWrap sx={{flexGrow:1}}>
							Interactive Resume
						</Typography>
							<Select
								value={'react'}
								onChange={event => window.location.pathname = `/${event.target.value}_client/`}
								className="framework-select"
							>
								<MenuItem value={'react'} className="framework-select-item"><img alt="React" src="/icons/react_logo.svg" className="framework-logo" />React</MenuItem>
								<MenuItem value={'svelte'} className="framework-select-item"><img alt="Svelte" src="/icons/svelte_logo.svg" className="framework-logo" />Svelte</MenuItem>
								<MenuItem value={'vue3'} className="framework-select-item"><img alt="Vue 3" src="/icons/vue_logo.svg" className="framework-logo" />Vue 3</MenuItem>
							</Select>
					</Toolbar>
				</AppBar>
				{menuDrawer}
				<main className={classNames(classes.content)}>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/projects" component={Projects} />
						<Route
							path="/projects/:projectID"
							component={Project}
						/>
						<Route
							path="/employers/:employerID"
							component={Employer}
						/>
						<Route exact path="/tags" component={Tags} />
						<Route path="/tags/:tagID" component={Tag} />
						<Route path="/visualize" component={Visualize} />
						{/* <Route path="/map" component={Map} /> */}
						<Redirect to="/" />
					</Switch>
				</main>
			</div>
		</div>
	);
};

const queryClient = new QueryClient();

const AppWithQueryProvider = () => (
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>
);

const AppWithThemeProvider = () => (
	<StyledEngineProvider injectFirst>
		<ThemeProvider theme={theme}>
			<AppWithQueryProvider />
		</ThemeProvider>
	</StyledEngineProvider>
);

export default AppWithThemeProvider;
