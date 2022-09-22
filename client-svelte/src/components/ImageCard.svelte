<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  import Card, {
    Content,
    PrimaryAction,
    Media,
  } from '@smui/card';

	import type { Image } from '@/api/types';

	export let image: Image;

	const dispatch = createEventDispatcher();
</script>

{#if image}
<Card>
	<PrimaryAction on:click={() => dispatch('clicked', image)}>
		<Media style="text-align:center"><img alt={image.filename} src={`/thumbnails/${image.filename}`} /></Media>
		<Content class="mdc-typography--body2" style="text-align:center">{image.caption}</Content>
	</PrimaryAction>
</Card>
{/if}
