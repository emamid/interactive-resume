<script lang="ts">
	import { packSiblings} from 'd3';
	import { groupBy, map, max, reduce, uniq } from 'lodash';

	import BubbleGroup from './BubbleGroup.svelte';
	import type { BubbleData, BubbleGroupData, BubbleChartConfig, Extents } from './types';

	let {
		class: className = '',
		chartConfig = {
			colorByProp: '',
			groupByProp: '',
			colorMap: {},
		},
		data = [],
		onbubbleClicked,
	}: {
		class?: string;
		chartConfig?: BubbleChartConfig;
		data?: BubbleData[];
		onbubbleClicked?: (bubble: BubbleData) => void;
	} = $props();

	let containerDiv = $state<HTMLDivElement | undefined>();

	let layout = $derived.by(() => {
		const svgWidth = (containerDiv && containerDiv.clientWidth) || 128;
		const svgHeight = (containerDiv && containerDiv.clientHeight) || 128;
		const maxValue = max(data.map(tag => tag.value));
		const groupKey = (item: BubbleData) =>
			String((item as BubbleData & Record<string, string | number | undefined>)[chartConfig.groupByProp] ?? '');
		const groupValues: string[] = chartConfig.groupByProp
			? uniq(data.map(groupKey)).sort()
			: ['All'];
		const groupedData: Record<string, BubbleData[]> = chartConfig.groupByProp
			? groupBy(data, groupKey)
			: { All: data };
		const tileCount = groupValues.length;
		const tileColumns = Math.max(Math.ceil(Math.sqrt(tileCount)), 1);
		const tileRows = Math.max(Math.floor(Math.sqrt(tileCount)), 1);
		const tileWidth = svgWidth / tileColumns;
		const tileHeight = svgHeight / tileRows;
		const tileCenterX = tileWidth / 2;
		const tileCenterY = tileHeight / 2;
		const groups = groupValues.reduce<Record<string, BubbleGroupData>>(
			(currentGroups, groupValue, groupIndex) => {
				const group = groupedData[groupValue] ?? [];
				packSiblings(group);
				const extents = group.reduce(
					(currentExtents, item) => {
						const x = item.x ?? 0;
						const y = item.y ?? 0;
						return {
							minX: Math.min(currentExtents.minX, x - item.r),
							minY: Math.min(currentExtents.minY, y - item.r),
							maxX: Math.max(currentExtents.maxX, x + item.r),
							maxY: Math.max(currentExtents.maxY, y + item.r)
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
			{} as Record<string, BubbleGroupData>
		);
		const maxExtents: Extents = reduce(
			groups,
			(currentExtents, group) => ({
				minX: Math.min(currentExtents.minX ?? 0, group.minX ?? 0),
				minY: Math.min(currentExtents.minY ?? 0, group.minY ?? 0),
				maxX: Math.max(currentExtents.maxX ?? 0, group.maxX ?? 0),
				maxY: Math.max(currentExtents.maxY ?? 0, group.maxY ?? 0)
			}),
			{
				minX: 0,
				minY: 0,
				maxX: 0,
				maxY: 0
			}
		);
		const maxGroupWidth = (maxExtents.maxX ?? 0) - (maxExtents.minX ?? 0);
		const maxGroupHeight = (maxExtents.maxY ?? 0) - (maxExtents.minY ?? 0);
		const tileScale =
			maxGroupWidth && maxGroupHeight
				? Math.min(tileWidth / maxGroupWidth, tileHeight / maxGroupHeight)
				: 1;
		return { svgWidth, svgHeight, maxValue, groups, tileColumns, tileRows, tileWidth, tileHeight, tileScale };
	});
</script>

<div class={className} bind:this={containerDiv}>
	<svg>
		<g class="bubbles-area">
			{#each map(layout.groups) as data (data.title)}
				<BubbleGroup {data} {chartConfig} maxValue={layout.maxValue} tileScale={layout.tileScale} tileWidth={layout.tileWidth} tileHeight={layout.tileHeight} {onbubbleClicked} />
			{/each}
		</g>
		{#each {length: layout.tileColumns - 1} as _, columnNum (columnNum)}
			<line
				x1={(columnNum + 1) * layout.tileWidth}
				y1={0}
				x2={(columnNum + 1) * layout.tileWidth}
				y2={layout.svgHeight}
				stroke="black"
				stroke-dasharray="2, 2"
			/>
		{/each}
		{#each {length: layout.tileRows - 1} as _, rowNum (rowNum)}
			<line
					x1={0}
					y1={(rowNum + 1) * layout.tileHeight}
					x2={layout.svgWidth}
					y2={(rowNum + 1) * layout.tileHeight}
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
