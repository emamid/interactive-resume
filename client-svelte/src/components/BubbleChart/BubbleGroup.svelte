<script lang="ts">
	import type { BubbleChartConfig, BubbleGroupData } from './types';
	import Bubble from './Bubble.svelte';

	export let data: BubbleGroupData = {
		data: [],
		column: 0,
		row: 0,
		centerX: 0,
		centerY: 0,
		title: '',
	};
	export let maxValue;
	export let chartConfig: BubbleChartConfig;
	export let tileWidth;
	export let tileHeight;
	export let tileScale;

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
		{#each data.data as bubbleData}
			<Bubble data={bubbleData} {chartConfig} {maxValue} on:bubbleClicked />
		{/each}
	{/if}
	</g>
	{#if data?.title !== 'All'}
		<text
			x={16}
			y={24}
			class="bubble-group-caption"
		>
			{data.title || 'Other'}
		</text>
	{/if}
</g>

<style>
	.bubble-group-caption {
		font-size: 90%;
	}
</style>