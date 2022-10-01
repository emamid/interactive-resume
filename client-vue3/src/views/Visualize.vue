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
		<BubbleChart
			class="chart-container"
			:chartConfig="{	colorByProp: colorBy,	colorMap, groupByProp: groupBy }"
			:data="mappedTags"
			@bubbleClicked="data => router.push(`/tags/${data.id}`)"
		/>
		<ColorLegend :colorMap="colorMap" />
	</div>
</template>

<script setup lang="ts">
import * as d3 from 'd3';
import { uniq } from 'lodash';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import type { ProjectTags } from '@/api/types';
import getProjectTags from '@/api/axios/getProjectTags';
import ColorLegend from '@/components/ColorLegend.vue';
import type { BubbleData } from '@/components/BubbleChart/types';
import BubbleChart from '@/components/BubbleChart/index.vue';

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

const colorBy = ref<string>('category');
const groupBy = ref<string>('');
const projectTags = ref<ProjectTags>([]);
projectTags.value = await getProjectTags();

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

.chart-container {
	flex-grow: 1;
}

.control-section {
	flex-grow: 0;
	margin-bottom: 1em;
}

</style>
	