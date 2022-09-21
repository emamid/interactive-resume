<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Item, Text, Graphic } from '@smui/list';

	export let href = '';
	export let icon = '';
	export let text = '';

	const dispatch = createEventDispatcher();
</script>

<Item
  {href}
	on:click={() => dispatch('navigated')}
>
	<Graphic class="material-icons">{icon}</Graphic>
	<Text>{text}</Text>
</Item>
