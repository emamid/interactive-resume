<template>
	<g class="bubble-group-outer"
		:transform="`translate(${data.column * tileWidth}, ${data.row * tileHeight})`"
	>
		<g class="bubble-group-inner"
			:transform="`translate(${data.centerX},${data.centerY}) scale(${tileScale})`"
		>
			<Bubble
				v-if="data.data"
				v-for="bubbleData in data.data" 
				:data="bubbleData"
				:chartConfig="chartConfig"
				:maxValue="maxValue"
				@bubbleClicked="data => emit('bubbleClicked', data)"
			/>
		</g>
		<text
			v-if="data?.title !== 'All'"
			x={16}
			y={24}
			class="bubble-group-caption"
		>
			{{data.title || 'Other'}}
		</text>
	</g>
</template>

<script setup lang="ts">
	import type { BubbleChartConfig, BubbleGroupData } from './types';
	import Bubble from './Bubble.vue';

	const { data, chartConfig, maxValue, tileScale, tileWidth, tileHeight } = defineProps<{
		data: BubbleGroupData,
		chartConfig: BubbleChartConfig,
		maxValue: number,
		tileWidth: number,
		tileHeight: number,
		tileScale: number,
	}>();

	const emit = defineEmits(['bubbleClicked']);
</script>

<style>
	.bubble-group-caption {
		font-size: 90%;
	}
</style>