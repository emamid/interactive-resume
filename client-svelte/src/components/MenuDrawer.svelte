<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  import Drawer, {
    Content,
  } from '@smui/drawer';
	import List, { Item, Text, Graphic } from '@smui/list';

	export let open = false;

	const dispatch = createEventDispatcher();
	let active = '';
	const setActive = (newActive: string) => {
		active = newActive;
	}
</script>


<Drawer variant="modal" bind:open on:SMUIDrawer:closed={() => dispatch('closed')}>
	<Content>
		<List>
			<Item
				href="javascript:void(0)"
				on:click={() => setActive('home')}
				activated={active === 'home'}
			>
				<Graphic class="material-icons" aria-hidden="true">home</Graphic>
				<Text>Home</Text>
			</Item>
			<Item
				href="javascript:void(0)"
				on:click={() => setActive('projects')}
				activated={active === 'projects'}
			>
				<Graphic class="material-icons" aria-hidden="true">build</Graphic>
				<Text>Projects</Text>
			</Item>
			<Item
				href="javascript:void(0)"
				on:click={() => setActive('tags')}
				activated={active === 'tags'}
			>
				<Graphic class="material-icons" aria-hidden="true">sell</Graphic>
				<Text>Tags</Text>
			</Item>
			<Item
				href="javascript:void(0)"
				on:click={() => setActive('visualize')}
				activated={active === 'visualize'}
			>
				<Graphic class="material-icons" aria-hidden="true">bubble_chart</Graphic>
				<Text>Visualize</Text>
			</Item>
		</List>
	</Content>
</Drawer>