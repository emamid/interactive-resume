<script lang="ts">
import axios from 'axios';
import { AppContent, Scrim } from '@smui/drawer';
import IconButton from '@smui/icon-button';
import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
import Router from 'svelte-spa-router';

import Home from './views/Home.svelte';
import MenuDrawer from './components/MenuDrawer.svelte'

import Employer from './views/Employer.svelte';
import Project from './views/Project.svelte';
import Projects from './views/Projects.svelte';
import Tag from './views/Tag.svelte';
import Tags from './views/Tags.svelte';
import Visualize from './views/Visualize.svelte';

axios.defaults.withCredentials = true;
let menuDrawerOpen = false;

const routes = {
	'/': Home,	
	'/employers/:id': Employer,
	'/projects': Projects,
	'/projects/:id': Project,
	'/tags': Tags,
	'/tags/:id': Tag,
	'/visualize': Visualize,
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