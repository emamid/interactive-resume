<script lang="ts">
import { push } from 'svelte-spa-router';
import Select, { Option } from '@smui/select';
import Slider from '@smui/slider';
import * as d3 from 'd3';
import { uniq } from 'lodash';

import type { ProjectTags } from '@/api/types';
import getProjectTags from '@/api/axios/getProjectTags';
import ColorLegend from '@/components/ColorLegend.svelte';
import type { BubbleData } from '@/components/BubbleChart/types';
import BubbleChart from '@/components/BubbleChart/index.svelte';
import { filterByValue, maxValue, VALUE_RANGE_MIN } from './value-range';

interface TagBubbleData extends BubbleData {
	value: number,
	r: number,
}

let projectTags: ProjectTags = [];
let colorBy = localStorage.getItem('visualize-colorBy') || 'category';
let groupBy: string = localStorage.getItem('visualize-groupBy') || '';

let colors = d3.scaleOrdinal(d3.schemeSet3);
let mappedTags: TagBubbleData[] = [];
let visibleTags: TagBubbleData[] = [];
let colorValues: string[] = [];
let colorMap: Record<string, string> = {};
let valueMax = VALUE_RANGE_MIN;
let trackedMax = VALUE_RANGE_MIN;
let valueStart = VALUE_RANGE_MIN;
let valueEnd = VALUE_RANGE_MIN;

$: {
	localStorage.setItem('visualize-colorBy', colorBy);
	localStorage.setItem('visualize-groupBy', groupBy);
}
$: mappedTags = projectTags?.map((tag) => ({
	id: tag.tagID,
	name: tag.Tag.name,
	category: tag.Tag.category,
	layer: tag.Tag.layer,
	value: tag.projectCount,
	r: 4 + tag.projectCount * 11
})) || [];
$: valueMax = maxValue(mappedTags);
$: if (trackedMax !== valueMax) {
	trackedMax = valueMax;
	valueStart = VALUE_RANGE_MIN;
	valueEnd = valueMax;
}
$: visibleTags = filterByValue(mappedTags, {
	lower: valueStart,
	upper: valueEnd
});
$: colorValues = uniq(visibleTags.map((tag: any) => tag[colorBy])).sort();
$: colorMap = colorValues.reduce(
	(currentMap, value) => ({
		...currentMap,
		[value]: colors(value)
	}),
	{}
);

(async function() {
	projectTags = await getProjectTags();
}());

</script>
	
<div class="visualize">
	<div class="control-section">
    <Select style="width: 20em" value={colorBy} label="Color By" on:SMUISelect:change={event => colorBy=event.detail.value}>
			<Option value={'category'}>Category</Option>
			<Option value={'layer'}>Layer</Option>
			<Option value={'value'}>Size</Option>
    </Select>	
    <Select style="width: 20em" value={groupBy} label="Group By" on:SMUISelect:change={event => groupBy=event.detail.value}>
			<Option value={''}>None</Option>
			<Option value={'category'}>Category</Option>
			<Option value={'layer'}>Layer</Option>
    </Select>
		<div class="value-range">
			<span class="value-range-label">Value</span>
			{#if valueMax > VALUE_RANGE_MIN}
				<Slider
					range
					discrete
					min={VALUE_RANGE_MIN}
					max={valueMax}
					step={1}
					bind:start={valueStart}
					bind:end={valueEnd}
					input$aria-label="Value"
				/>
			{/if}
		</div>
	</div>
	<BubbleChart
		class="chart-container"
		chartConfig={{
			colorByProp: colorBy,
			groupByProp: groupBy,
			colorMap,
		}}		
		data={visibleTags}
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
	justify-content: space-between;
}

.control-section {
	margin-bottom: 1em;
}

.value-range {
	display: inline-block;
	position: relative;
	width: 20em;
	height: 56px;
	margin-left: 16px;
	vertical-align: top;
}

.value-range-label {
	position: absolute;
	top: 8px;
	left: 0;
	font-size: 12px;
	line-height: 16px;
	letter-spacing: 0.009375em;
	color: rgba(0, 0, 0, 0.6);
	pointer-events: none;
}

.value-range :global(.mdc-slider) {
	position: absolute;
	top: 32px;
	left: 0;
	right: 0;
	width: auto;
	margin: 0;
}

</style>
