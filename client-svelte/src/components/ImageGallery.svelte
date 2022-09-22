<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';

	import type { Image } from '@/api/types';	
	import ImageCard from './ImageCard.svelte';

	export let images: Image[] = [];

</script>


{#if images?.length}
	<div class="mdc-typography--headline6">Gallery</div>
	<LayoutGrid>
		{#each images as image}
			<Cell span={3}>
				<ImageCard {image} />
			</Cell>
		{/each}
	</LayoutGrid>
{/if}
