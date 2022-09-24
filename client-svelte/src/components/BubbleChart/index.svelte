<script lang="ts">
	import { packSiblings} from 'd3';
	import { groupBy, map, max, reduce, uniq } from 'lodash';

	import BubbleGroup from './BubbleGroup.svelte';
	import type { BubbleData, BubbleGroupData, BubbleChartConfig, Extents } from './types';

	export let chartConfig: BubbleChartConfig = {
		colorByProp: '',
		groupByProp: '',
		colorMap: {},
	}
	export let data: BubbleData[] = [];
	
	let svgWidth = 1;
	let svgHeight = 1;
	let maxValue: number;
	let groupValues: string[];
	let groupedData: Record<string, BubbleData[]>;
	let groups: Record<string, BubbleGroupData>;
	let tileCount = 0;
	let tileColumns = 1;
	let tileRows = 1;
	let tileWidth = 128;
	let tileHeight = 128;
	let tileCenterX = 64;
	let tileCenterY = 64;
	let maxExtents: Extents = {
		minX: 0,
		minY: 0,
		maxX: 1,
		maxY: 1,
	}
	let maxGroupWidth = 1;
	let maxGroupHeight = 1;
	let tileScale = 1;
	let containerDiv;

	$: {
		svgWidth = (containerDiv && containerDiv.clientWidth) || 128;
		svgHeight =	(containerDiv && containerDiv.clientHeight) || 128;		
		maxValue = max(data.map(tag => tag.value));
		groupValues = chartConfig.groupByProp
			? uniq(data.map((item) => item[chartConfig.groupByProp])).sort()
			: ['All'];
		groupedData = chartConfig.groupByProp
			? groupBy(data, chartConfig.groupByProp)
			: { All: data };
		tileCount = groupValues.length;
		tileColumns = Math.max(Math.ceil(Math.sqrt(tileCount)), 1);
		tileRows = Math.max(Math.floor(Math.sqrt(tileCount)), 1);
		tileWidth = svgWidth / tileColumns;
		tileHeight = svgHeight / tileRows;
		tileCenterX = tileWidth / 2;
		tileCenterY = tileHeight / 2;
		groups = groupValues.reduce(
			(currentGroups, groupValue, groupIndex) => {
				const group = groupedData[groupValue];
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
						centerX: tileCenterX - (extents.maxX + extents.minX) / 2,
						centerY: tileCenterY - (extents.maxY + extents.minY) / 2,
						column: groupIndex % tileColumns,
						data: group,
						groupIndex,
						row: Math.floor(groupIndex / tileColumns),
						title: groupValue
					}
				};
			},
			{}
		);
		maxExtents = reduce(
			groups,
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
		);
		maxGroupWidth = maxExtents.maxX - maxExtents.minX;
		maxGroupHeight = maxExtents.maxY - maxExtents.minY;
		tileScale =
			maxGroupWidth && maxGroupHeight
				? Math.min(tileWidth / maxGroupWidth, tileHeight / maxGroupHeight)
				: 1;
	}
</script>

<div class={$$props.class} bind:this={containerDiv}>
	<svg>
		<g class="bubbles-area">
			{#each map(groups) as data}
				<BubbleGroup {data} {chartConfig} {maxValue} {tileScale} {tileWidth} {tileHeight} on:bubbleClicked />
			{/each}
		</g>
		{#each {length: tileColumns - 1} as _, columnNum}
			<line
				x1={(columnNum + 1) * tileWidth}
				y1={0}
				x2={(columnNum + 1) * tileWidth}
				y2={svgHeight}
				stroke="black"
				stroke-dasharray="2, 2"
			/>
		{/each}
		{#each {length: tileRows - 1} as _, rowNum}
			<line
					x1={0}
					y1={(rowNum + 1) * tileHeight}
					x2={svgWidth}
					y2={(rowNum + 1) * tileHeight}
					stroke="black"
				stroke-dasharray="2, 2"
			/>
		{/each}
	</svg>
</div>

<style>
	svg {
		height: 100%;
		width: 100%;
	}
</style>
