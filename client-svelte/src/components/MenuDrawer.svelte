<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  import Drawer, {
    Content,
  } from '@smui/drawer';
	import List from '@smui/list';
	
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
			<MenuDrawerItem icon="home" path="/" text="Home" on:navigated={navigated} />
			<MenuDrawerItem icon="build" path="/projects" text="Projects" on:navigated={navigated} />
			<MenuDrawerItem icon="sell" path="/tags" text="Tags" on:navigated={navigated} />
			<MenuDrawerItem icon="bubble_chart" path="/visualize" text="Visualize" on:navigated={navigated} />
		</List>
	</Content>
</Drawer>
