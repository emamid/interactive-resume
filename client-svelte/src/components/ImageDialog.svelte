<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Dialog, { Title, Content } from '@smui/dialog';

	import type { Image } from '@/api/types';

	export let image: Image;
	export let open = false;

	const dispatch = createEventDispatcher();
</script>

<Dialog
  bind:open
  aria-labelledby="image-dialog-title"
	on:SMUIDialog:closed={() => dispatch('closed')}
	fullscreen
>
	{#if image && open}
		<Title style="text-align:center" id="image-dialog-title">{image.caption}</Title>
		<Content style="text-align:center">
			<img class="dialog-image" alt={image.caption} src={`/images/${image.filename}`} />
		</Content>
	{/if}
</Dialog>

<style>
	.dialog-image {
		max-height: 90%;
		max-width: 90%;
	}
</style>