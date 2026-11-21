<script lang="ts">
  import Drawer, {
    Content,
  } from '@smui/drawer';
	import List, { Separator } from '@smui/list';
	
	import MenuDrawerItem from './MenuDrawerItem.svelte';

	let { open = $bindable(false) }: { open?: boolean } = $props();

	const navigated = () => {
		open = false;
	}
</script>

<Drawer variant="modal" bind:open>
	<Content>
		<List>
			<MenuDrawerItem href="./#/" icon="home" text="Home" onnavigated={navigated} />
			<MenuDrawerItem href="./#/projects" icon="build" text="Projects" onnavigated={navigated} />
			<MenuDrawerItem href="./#/tags" icon="sell" text="Tags" onnavigated={navigated} />
			<MenuDrawerItem href="./#/visualize" icon="bubble_chart" text="Visualize" onnavigated={navigated} />
			<MenuDrawerItem href="./#/api/rest" icon="api" text="REST API" onnavigated={navigated} />
			<Separator />
			<MenuDrawerItem href="/angular_client" imageSrc="/icons/angular_logo.svg" text="Angular" />
			<MenuDrawerItem href="/react_client" imageSrc="/icons/react_logo.svg" text="React" />
			<MenuDrawerItem href="/vue3_client" imageSrc="/icons/vue_logo.svg" text="Vue 3" />
			<Separator />
			<MenuDrawerItem href="./#/data-table" text="Svelte Data Table" />
		</List>
	</Content>
</Drawer>
