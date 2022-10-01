<template>
	<g
		:transform="`translate(${data.x},${data.y})`"
	>
		<circle
			:r="data.r * 0.95"
			:style="`fill: ${chartConfig.colorMap[data[chartConfig.colorByProp]]}`"
			@click="emit('bubbleClicked', data)"
		>
			<title>{{data.name}}</title>
		</circle>
		<foreignObject
			:width="data.r * 1.6"
			:height="data.r * 1.6"
			:x="data.r * -0.8"
			:y="data.r * -0.8"
		>
			<body
				:style="`height: ${data.r * 1.6}px; width: ${data.r * 1.6}px`"
				class="bubble"
				:title="data.name"
				@click="emit('bubbleClicked', data)"
			>
				<p
					:style="`font-size: ${100 - Math.pow(maxValue - data.value, 1.8)}%`"
					class="bubble"
					:title="data.name"
					@click="emit('bubbleClicked', data)"
				>
					{{data.name}}
				</p>
			</body>
		</foreignObject>
	</g>
</template>

<script setup lang="ts">
	import type { BubbleChartConfig, BubbleData } from './types';

	const { data, chartConfig, maxValue } = defineProps<{
		chartConfig: BubbleChartConfig,
		data: BubbleData,
		maxValue: number,
	}>();
	
	const style = `height: ${data.r * 1.6}; width: ${data.r * 1.6}`;
	const emit = defineEmits(['bubbleClicked']);
</script>

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
