<template>
	<div class="visualize">
		<v-row class="control-section">
			<v-col cols="2">
				<v-select
					:items="colorByItems"
					label="Color By"
					item-title="text"
					item-value="value"
					variant="underlined"
					v-model="colorBy"					
				/>
			</v-col>
			<v-col cols="2">
				<v-select
					:items="groupByItems"
					label="Group By"
					item-title="text"
					item-value="value"
					variant="underlined"
					v-model="groupBy"
				/>
			</v-col>
			<v-col cols="2">
				<div class="value-range-control">
					<label class="value-range-label">Value</label>
					<v-range-slider
						class="value-range"
						color="primary"
						:min="rangeMin"
						:max="valueMax"
						:step="1"
						thumb-label
						hide-details
						v-model="valueRange"
					/>
				</div>
			</v-col>
		</v-row>
		<BubbleChart
			class="chart-container"
			:chartConfig="{	colorByProp: colorBy,	colorMap, groupByProp: groupBy }"
			:data="visibleTags"
			@bubbleClicked="data => router.push(`/tags/${data.id}`)"
		/>
		<ColorLegend :colorMap="colorMap" />
	</div>
</template>

<script setup lang="ts">
import * as d3 from 'd3';
import { uniq } from 'lodash';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import type { ProjectTags } from '@/api/types';
import getProjectTags from '@/api/axios/getProjectTags';
import ColorLegend from '@/components/ColorLegend.vue';
import type { BubbleData } from '@/components/BubbleChart/types';
import BubbleChart from '@/components/BubbleChart/index.vue';
import { filterByValue, maxValue, valueRangeMin } from './value-range';

interface TagBubbleData extends BubbleData {
	value: number,
	r: number,
}

const router = useRouter();

const colorByItems = [{
	value: 'category',
	text: 'Category'
}, {
	value: 'layer',
	text: 'Layer'
}, {
	value: 'value',
	text: 'Value'
}];

const groupByItems = [{
	value: '',
	text: 'None'
},{
	value: 'category',
	text: 'Category'
}, {
	value: 'layer',
	text: 'Layer'
}];
const colors = d3.scaleOrdinal(d3.schemeSet3);

const colorBy = ref<string>(localStorage.getItem('visualize-colorBy') || 'category');
const groupBy = ref<string>(localStorage.getItem('visualize-groupBy') || '');
const projectTags = ref<ProjectTags>([]);
projectTags.value = await getProjectTags();

watch(colorBy, newColorBy => localStorage.setItem('visualize-colorBy', newColorBy));
watch(groupBy, newGroupBy => localStorage.setItem('visualize-groupBy', newGroupBy));

const mappedTags: TagBubbleData[] = projectTags.value?.map((tag) => ({
	id: tag.tagID,
	name: tag.Tag.name,
	category: tag.Tag.category,
	layer: tag.Tag.layer,
	value: tag.projectCount,
	r: 4 + tag.projectCount * 11,
	x: 0,
	y: 0,
})) || [];
const rangeMin = valueRangeMin;
const valueMax = maxValue(mappedTags);
const valueRange = ref<[number, number]>([rangeMin, valueMax]);
const visibleTags = computed(() => filterByValue(mappedTags, {
	lower: valueRange.value[0],
	upper: valueRange.value[1],
}));
const colorValues = computed(() => uniq(visibleTags.value.map((tag: any) => tag[colorBy.value])).sort());
const colorMap = computed(() => colorValues.value.reduce(
	(currentMap, value) => ({
		...currentMap,
		[value]: colors(value)
	}),
	{}
));

</script>

<style>
.visualize {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.chart-container {
	flex-grow: 1;
}

.control-section {
	flex-grow: 0;
	margin-bottom: 1em;
}

.value-range-control {
	position: relative;
	height: 70px;
}

.value-range-label {
	position: absolute;
	top: 0;
	left: 0;
	font-size: 12px;
	line-height: 18px;
	letter-spacing: 0.009375em;
	opacity: 0.6;
}

.value-range.v-slider.v-input--horizontal {
	position: absolute;
	top: 32px;
	left: 0;
	right: 0;
	margin: 0;
}

</style>
	