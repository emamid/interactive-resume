<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { BubbleChartConfig, BubbleData } from './types';

	export let data: BubbleData;
	export let chartConfig: BubbleChartConfig;
	export let maxValue = 1;
	
	const dispatch = createEventDispatcher();

	const bubbleClicked = () => dispatch('bubbleClicked', data);
</script>

<g
	transform={`translate(${data.x},${data.y})`}
>
	<circle
		r={data.r * 0.95}
		style={`fill: ${chartConfig.colorMap[data[chartConfig.colorByProp]]}`}
		on:click={bubbleClicked}
	>
		<title>{data.name}</title>
	</circle>
	<foreignObject
		width={data.r * 1.6}
		height={data.r * 1.6}
		x={data.r * -0.8}
		y={data.r * -0.8}
	>
		<body
		  style={`height: ${data.r * 1.6}; width: ${data.r * 1.6}`}
			class="bubble"
			title={data.name}
			on:click={bubbleClicked}
		>
			<p
			  style={`font-size: ${100 - Math.pow(maxValue - data.value, 1.8)}%`}
				class="bubble"
				title={data.name}
				on:click={bubbleClicked}
			>
				{data.name}
			</p>
		</body>
	</foreignObject>
</g>

<style>
	body.bubble {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	p.bubble {
		margin: 0;
		text-align: center;
	}
</style>
