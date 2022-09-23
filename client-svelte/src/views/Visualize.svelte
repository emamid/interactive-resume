<script lang="ts">
import Select, { Option } from '@smui/select';
import { scaleOrdinal, schemeSet3 } from 'd3';
import { uniq } from 'lodash';

import type { TagBubble } from '@/types';
import type { ProjectTags } from '@/api/types';
import getProjectTags from '@/api/axios/getProjectTags';
import ColorLegend from '@/components/ColorLegend.svelte';

let projectTags: ProjectTags = [];
let colorBy = 'category';
let groupBy: boolean | string = false;

// const svgWidth = (chartDiv.current && chartDiv.current.clientWidth) || 128;
// const svgHeight =	(chartDiv.current && chartDiv.current.clientHeight) || 128;

let svgWidth = 128;
let svgHeight = 128;

let colors = scaleOrdinal(schemeSet3);
let mappedTags: TagBubble[] = [];
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
			<Option value={false}>None</Option>
			<Option value={'category'}>Category</Option>
			<Option value={'layer'}>Layer</Option>
    </Select>		
	</div>
	Visualize view, implementation in progress
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
