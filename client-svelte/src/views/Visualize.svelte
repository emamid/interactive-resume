<script lang="ts">
import { push } from 'svelte-spa-router';
import Select, { Option } from '@smui/select';
import * as d3 from 'd3';
import { uniq } from 'lodash';

import type { ProjectTags } from '@/api/types';
import getProjectTags from '@/api/axios/getProjectTags';
import ColorLegend from '@/components/ColorLegend.svelte';
import type { BubbleData } from '@/components/BubbleChart/types';
import BubbleChart from '@/components/BubbleChart/index.svelte';

interface TagBubbleData extends BubbleData {
	value: number,
	r: number,
}

let projectTags: ProjectTags = [];
let colorBy = 'category';
let groupBy: string = '';

let colors = d3.scaleOrdinal(d3.schemeSet3);
let mappedTags: TagBubbleData[] = [];
let colorValues: string[] = [];
let colorMap: Record<string, string> = {};

$: {
	mappedTags = projectTags?.map((tag) => ({
		id: tag.tagID,
		name: tag.Tag.name,
		category: tag.Tag.category,
		layer: tag.Tag.layer,
		value: tag.projectCount,
		r: 4 + tag.projectCount * 11
	})) || [];
	colorValues = uniq(mappedTags.map((tag: any) => tag[colorBy])).sort();
	colorMap = colorValues.reduce(
		(currentMap, value) => ({
			...currentMap,
			[value]: colors(value)
		}),
		{}
	);
}

(async function() {
	projectTags = await getProjectTags();
}());

</script>
	
<div class="visualize">
	<div class="control-section">
    <Select value={colorBy} label="Color By" on:SMUISelect:change={event => colorBy=event.detail.value}>
			<Option value={'category'}>Category</Option>
			<Option value={'layer'}>Layer</Option>
			<Option value={'value'}>Size</Option>
    </Select>	
    <Select value={groupBy} label="Group By" on:SMUISelect:change={event => groupBy=event.detail.value}>
			<Option value={''}>None</Option>
			<Option value={'category'}>Category</Option>
			<Option value={'layer'}>Layer</Option>
    </Select>		
	</div>
	<BubbleChart
		class="chart-container"
		chartConfig={{
			colorByProp: colorBy,
			groupByProp: groupBy,
			colorMap,
		}}		
		data={mappedTags}
		on:bubbleClicked={event => push(`/tags/${event.detail.id}`)}
	/>
	<ColorLegend {colorMap} />
</div>

<style>
.visualize {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
}

.control-section {
	margin-bottom: 1em;
}

</style>
