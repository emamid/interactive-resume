<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Item, Text, Graphic } from '@smui/list';
	import { push } from 'svelte-spa-router'

	export let icon = '';
	export let path = '';
	export let text = '';

	const dispatch = createEventDispatcher();
	const navigate = () => {
		push(path);		
		dispatch('navigated', path);
	}
</script>

<Item
	on:click={navigate}
>
	<Graphic class="material-icons">{icon}</Graphic>
	<Text>{text}</Text>
</Item>
