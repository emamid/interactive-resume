
<template>
	<div ref="containerDiv">
		<svg>
			<BubbleGroup
				v-for="data in groups"
				:data="data"
				:chartConfig="chartConfig"
				:maxValue="maxValue"
				:tileScale="tileScale"
				:tileWidth="tileWidth"
				:tileHeight="tileHeight"
				@bubbleClicked="data => emit('bubbleClicked', data)"
			/>
			<line v-for="columnNum in tileColumns -1"
				:x1="columnNum * tileWidth"
				:y1="0"
				:x2="columnNum * tileWidth"
				:y2="svgHeight"
				stroke="black"
				stroke-dasharray="2, 2"
			/>
			<line v-for="rowNum in tileRows -1"
				:x1="0"
				:y1="rowNum * tileHeight"
				:x2="svgWidth"
				:y2="rowNum * tileHeight"
				stroke="black"
				stroke-dasharray="2, 2"
			/>
		</svg>		
	</div>
</template>

<script setup lang="ts">
	import { packSiblings} from 'd3';
	import { groupBy, max, reduce, uniq } from 'lodash';
	import { computed, ref, toRefs } from 'vue';

	import BubbleGroup from './BubbleGroup.vue';
	import type { BubbleData, BubbleGroupData, BubbleChartConfig, Extents } from './types';

	const props = defineProps<{
		chartConfig: BubbleChartConfig,
		data: BubbleData[],
	}>();

	const { chartConfig, data } = toRefs(props);
	const emit = defineEmits(['bubbleClicked']);

	const containerDiv = ref<HTMLDivElement>();
	const svgWidth = computed(() => containerDiv.value?.clientWidth || 128);
	const svgHeight = computed(() => containerDiv.value?.clientHeight || 128);
	const maxValue = computed(() => max(data.value.map(tag => tag.value)) || 1);
	const groupValues = computed(() => chartConfig.value.groupByProp
			? uniq(data.value.map((item: any) => item[chartConfig.value.groupByProp])).sort()
			: ['All']);
	const groupedData = computed(() => chartConfig.value.groupByProp
			? groupBy(data.value, chartConfig.value.groupByProp)
			: { All: data.value });
	const tileColumns = computed(() => Math.max(Math.ceil(Math.sqrt(groupValues.value.length)), 1));
	const tileRows = computed(() => Math.max(Math.floor(Math.sqrt(groupValues.value.length)), 1))
	const tileWidth = computed(() => svgWidth.value / tileColumns.value)
	const tileHeight = computed(() => svgHeight.value / tileRows.value);
	const tileScale = computed(() => (maxGroupWidth.value && maxGroupHeight.value)
		? Math.min(tileWidth.value / maxGroupWidth.value, tileHeight.value / maxGroupHeight.value)
		: 1);
	const groups = computed(() => groupValues.value.reduce(
		(currentGroups, groupValue, groupIndex: number) => {
			const group = groupedData.value[groupValue];
			packSiblings(group);
			const extents = group.reduce(
				(currentExtents, item) => {
					return {
						minX: Math.min(currentExtents.minX, item.x - item.r),
						minY: Math.min(currentExtents.minY, item.y - item.r),
						maxX: Math.max(currentExtents.maxX, item.x + item.r),
						maxY: Math.max(currentExtents.maxY, item.y + item.r)
					};
				},
				{ minX: 0, minY: 0, maxX: 0, maxY: 0 }
			);
			return {
				...currentGroups,
				[groupValue]: {
					...extents,
					centerX: (tileWidth.value / 2) - (extents.maxX + extents.minX) / 2,
					centerY: (tileHeight.value /2 ) - (extents.maxY + extents.minY) / 2,
					column: groupIndex % tileColumns.value,
					data: group,
					groupIndex,
					row: Math.floor(groupIndex / tileColumns.value),
					title: groupValue
				}
			};
		},
		{}
	)
);
const maxExtents = computed(() => reduce(
	groups.value,
	(currentExtents, group) => ({
		minX: Math.min(currentExtents.minX, group.minX),
		minY: Math.min(currentExtents.minY, group.minY),
		maxX: Math.max(currentExtents.maxX, group.maxX),
		maxY: Math.max(currentExtents.maxY, group.maxY)
	}),
	{
		minX: 0,
		minY: 0,
		maxX: 0,
		maxY: 0
	}
));
const maxGroupWidth = computed(() => maxExtents.value.maxX - maxExtents.value.minX);
const maxGroupHeight = computed(() => maxExtents.value.maxY - maxExtents.value.minY);
</script>

<style>
	svg {
		height: 100%;
		width: 100%;
	}
</style>
