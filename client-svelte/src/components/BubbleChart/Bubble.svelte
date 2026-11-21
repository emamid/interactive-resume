<script lang="ts">
	import type { BubbleChartConfig, BubbleData } from './types';

	let {
		data,
		chartConfig,
		maxValue = 1,
		onbubbleClicked,
	}: {
		data: BubbleData;
		chartConfig: BubbleChartConfig;
		maxValue?: number;
		onbubbleClicked?: (bubble: BubbleData) => void;
	} = $props();

	const bubbleClicked = () => onbubbleClicked?.(data);
</script>

<g
	transform={`translate(${data.x},${data.y})`}
	role="button"
	tabindex="0"
	onclick={bubbleClicked}
	onkeydown={(event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			bubbleClicked();
		}
	}}
>
	<circle
		r={data.r * 0.95}
		style={`fill: ${chartConfig.colorMap[String((data as BubbleData & Record<string, string | number>)[chartConfig.colorByProp])]}`}
	>
		<title>{data.name}</title>
	</circle>
	<foreignObject
		width={data.r * 1.6}
		height={data.r * 1.6}
		x={data.r * -0.8}
		y={data.r * -0.8}
	>
		<div
		  style={`height: ${data.r * 1.6}px; width: ${data.r * 1.6}px`}
			class="bubble"
			title={data.name}
		>
			<p
			  style={`font-size: ${100 - Math.pow(maxValue - data.value, 1.8)}%`}
				class="bubble"
				title={data.name}
			>
				{data.name}
			</p>
		</div>
	</foreignObject>
</g>

<style>
	div.bubble {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	p.bubble {
		margin: 0;
		text-align: center;
	}
</style>
