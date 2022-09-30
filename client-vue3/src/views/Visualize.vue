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
		</v-row>
		<!-- <BubbleChart
			class="chart-container"
			chartConfig={{
				colorByProp: colorBy,
				groupByProp: groupBy,
				colorMap,
			}}		
			data={mappedTags}
			on:bubbleClicked={event => push(`/tags/${event.detail.id}`)}
		/> -->
		<ColorLegend :colorMap="colorMap" />
	</div>
</template>

<script setup lang="ts">
import * as d3 from 'd3';
import { uniq } from 'lodash';
import { computed, ref, watch } from 'vue';

import type { ProjectTags } from '@/api/types';
import getProjectTags from '@/api/axios/getProjectTags';
import ColorLegend from '@/components/ColorLegend.vue';
import type { BubbleData } from '@/components/BubbleChart/types';

interface TagBubbleData extends BubbleData {
	value: number,
	r: number,
}

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

const colorBy = ref<string>('category');
const groupBy = ref<string>('');
const projectTags = ref<ProjectTags>([]);
projectTags.value = await getProjectTags();

const mappedTags = projectTags.value?.map((tag) => ({
	id: tag.tagID,
	name: tag.Tag.name,
	category: tag.Tag.category,
	layer: tag.Tag.layer,
	value: tag.projectCount,
	r: 4 + tag.projectCount * 11
})) || [];
const colorValues = computed(() => uniq(mappedTags.map((tag: any) => tag[colorBy.value])).sort());
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

.control-section {
	margin-bottom: 1em;
}

</style>
	