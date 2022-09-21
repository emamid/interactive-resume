<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  import Drawer, {
    Content,
  } from '@smui/drawer';
	import List, { Separator } from '@smui/list';
	
	import MenuDrawerItem from './MenuDrawerItem.svelte';

	export let open = false;

	const dispatch = createEventDispatcher();
	const navigated = () => {
		dispatch('closed');
	}
</script>

<Drawer variant="modal" bind:open on:SMUIDrawer:closed={() => dispatch('closed')}>
	<Content>
		<List>
			<MenuDrawerItem href="./#/" icon="home" text="Home" on:navigated={navigated} />
			<MenuDrawerItem href="./#/projects" icon="build" text="Projects" on:navigated={navigated} />
			<MenuDrawerItem href="./#/tags" icon="sell" text="Tags" on:navigated={navigated} />
			<MenuDrawerItem href="./#/visualize" icon="bubble_chart" text="Visualize" on:navigated={navigated} />
			<Separator />
			<MenuDrawerItem href="/react_client" imageSrc="./react_logo.svg" text="React" />
		</List>
	</Content>
</Drawer>
