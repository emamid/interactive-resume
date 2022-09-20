<script lang="ts">
import axios from 'axios';
import { AppContent, Scrim } from '@smui/drawer';
import IconButton from '@smui/icon-button';
import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
import Router from 'svelte-spa-router';
import {wrap} from 'svelte-spa-router/wrap';

import Home from './views/Home.svelte';
import MenuDrawer from './components/MenuDrawer.svelte'

axios.defaults.withCredentials = true;
let menuDrawerOpen = false;

const routes = {
	'/': Home,	
	'/employer/:id': wrap({
	  asyncComponent: () => import('./views/Employer.svelte')
  }),
	'/projects': wrap({
	  asyncComponent: () => import('./views/Projects.svelte')
  }),
	'/projects/:id': wrap({
	  asyncComponent: () => import('./views/Project.svelte')
  }),
	'/tags': wrap({
	  asyncComponent: () => import('./views/Tags.svelte')
  }),
	'/tags/:id': wrap({
	  asyncComponent: () => import('./views/Tag.svelte')
  }),
	'/visualize': wrap({
	  asyncComponent: () => import('./views/Visualize.svelte')
  }),
	'*': Home,
}

const toggleMenuDrawer = () => menuDrawerOpen = !menuDrawerOpen;
</script>

<MenuDrawer open={menuDrawerOpen} on:closed={() => menuDrawerOpen = false}/>
<Scrim />
<TopAppBar variant="static" color="primary">
	<Row>
		<Section>
			<IconButton class="material-icons" on:click={toggleMenuDrawer}>menu</IconButton>
			<Title>Interactive Resume</Title>
		</Section>
	</Row>
</TopAppBar>
<AppContent>
	<main>
		<Router {routes} />
	</main>
</AppContent>


<style>
</style>