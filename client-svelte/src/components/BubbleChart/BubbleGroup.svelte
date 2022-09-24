<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { packSiblings} from 'd3';
	import { groupBy, map, max, reduce, uniq } from 'lodash';

	import type { BubbleGroupData } from './types';

	export let data: BubbleGroupData = {
		data: [],
		column: 0,
		row: 0,
		centerX: 0,
		centerY: 0,
		title: '',
	};
	export let tileWidth = 1;
	export let tileHeight = 1;
	export let tileScale = 1;
</script>

<g class="bubble-group-outer"
	transform={`translate(${data.column * tileWidth}, ${
		data.row * tileHeight
	})`}
>
	<g class="bubble-group-inner"
		transform={`translate(${data.centerX},${data.centerY}) scale(${tileScale})`}
	>
	{#if data.data}
		<text
			x={16}
			y={24}
			style="fontSize: 90%"
		>
			{data.title || 'Other'}
		</text>
	{/if}
	</g>
</g>
