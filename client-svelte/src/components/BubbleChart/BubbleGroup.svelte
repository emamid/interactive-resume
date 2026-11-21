<script lang="ts">
	import type { BubbleChartConfig, BubbleData, BubbleGroupData } from './types';
	import Bubble from './Bubble.svelte';

	let {
		data = {
			data: [],
			column: 0,
			row: 0,
			centerX: 0,
			centerY: 0,
			title: '',
		},
		maxValue = 1,
		chartConfig,
		tileWidth,
		tileHeight,
		tileScale,
		onbubbleClicked,
	}: {
		data?: BubbleGroupData;
		maxValue?: number;
		chartConfig: BubbleChartConfig;
		tileWidth: number;
		tileHeight: number;
		tileScale: number;
		onbubbleClicked?: (bubble: BubbleData) => void;
	} = $props();

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
		{#each data.data as bubbleData (bubbleData.id)}
			<Bubble data={bubbleData} {chartConfig} {maxValue} {onbubbleClicked} />
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