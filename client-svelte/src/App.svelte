<script lang="ts">
import axios from 'axios';
import { AppContent, Scrim } from '@smui/drawer';
import IconButton from '@smui/icon-button';
import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';

import Home from './views/Home.svelte';
import Projects from './views/Projects.svelte';
import MenuDrawer from './components/MenuDrawer.svelte'

axios.defaults.withCredentials = true;
let menuDrawerOpen = false;

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
		<!-- <Home/> -->
		<Projects />
	</main>
</AppContent>


<style>
</style>