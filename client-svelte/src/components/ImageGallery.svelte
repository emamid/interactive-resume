<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';

	import type { Image } from '@/api/types';	
	import ImageCard from './ImageCard.svelte';

	let {
		images = [],
		onclicked,
	}: {
		images?: Image[];
		onclicked?: (image: Image) => void;
	} = $props();
</script>


{#if images?.length}
	<div class="mdc-typography--headline6">Gallery</div>
	<LayoutGrid>
		{#each images as image (image.filename)}
			<Cell span={3}>
				<ImageCard {image} {onclicked} />
			</Cell>
		{/each}
	</LayoutGrid>
{/if}
