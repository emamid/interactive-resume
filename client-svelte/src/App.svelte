<script lang="ts">
	import axios from 'axios';
	import { AppContent, Scrim } from '@smui/drawer';
	import IconButton from '@smui/icon-button';
	import Select, { Option } from '@smui/select';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Router from 'svelte-spa-router';
	
	import MenuDrawer from '@/components/MenuDrawer.svelte'
	
	import Employer from '@/views/Employer.svelte';
	import Home from '@/views/Home.svelte';
	import Project from '@/views/Project.svelte';
	import Projects from '@/views/Projects.svelte';
	import RESTAPI from '@/views/RESTAPI.svelte';
	import Tag from '@/views/Tag.svelte';
	import Tags from '@/views/Tags.svelte';
	import Visualize from '@/views/Visualize.svelte';
	
	axios.defaults.withCredentials = true;
	let menuDrawerOpen = false;
	
	const routes = {
		'/': Home,
		'/api/rest': RESTAPI,
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
			<Section align="end">
				<Select class="framework-select" value={'svelte'} on:SMUISelect:change={event => window.location.pathname = `/${event.detail.value}_client/`}>
					<Option value={'react'}><img alt="React" src="/icons/react_logo.svg" class="framework-logo" href="/react_client/#"/>React</Option>
					<Option value={'svelte'}><img alt="Svelte" src="/icons/svelte_logo.svg" class="framework-logo" href="/svelte_client/#"/>Svelte</Option>
					<Option value={'vue3'}><img alt="Vue" src="/icons/vue_logo.svg" class="framework-logo" href="/vue3_client/#"/>Vue 3</Option>
				</Select>	
			</Section>
		</Row>
	</TopAppBar>
	<AppContent class="app-content">
		<main>
			<Router {routes} />
		</main>
	</AppContent>
	
	
	<style>
		main {
			height: 100%;
		}

		img.framework-logo {
			height: 24px;
			width: 24px;
			padding-right: 32px;
		}
	</style>