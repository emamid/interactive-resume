<script lang="ts">
	import { createEventDispatcher } from 'svelte';
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
	export let svgWidth = 1;
	export let svgHeight = 1;

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
		maxX: 0,
		maxY: 0,
	}
	let maxGroupWidth = 1;
	let maxGroupHeight = 1;
	let tileScale = 1;

	$: {
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

	function* lineSequence(lineCount: number, lineSpacing: number) {
		for (let lineNum = 1; lineNum < lineCount; lineNum++)
			yield lineNum * lineSpacing;
	}

	const dispatch = createEventDispatcher();
</script>

<svg
	style="height: 100%; width: 100%"
>
	<g class="bubbles-area">
		{#each map(groups) as data}
			<BubbleGroup {data} />
		{/each}
	</g>
</svg>

<!-- <g className="bubbles-area">
	{map(
		groups,
		({
			data: groupData,
			column,
			row,
			centerX,
			centerY,
			title
		}) => {
			return (
				<g
					key={title}
					transform={`translate(${column * tileWidth}, ${
						row * tileHeight
					})`}
				>
					<g
						transform={`translate(${centerX},${centerY}) scale(${tileScale})`}
					>
						{groupData.map((item: any) => (
							<g
								key={item.id}
								transform={`translate(${item.x},${item.y})`}
							>
								<circle
									r={item.r * 0.95}
									style={{
										fill: colorMap[
											item[colorByProp]
										]
									}}
									onClick={() =>
										bubbleClick &&
										bubbleClick(item)
									}
								>
									<title>{item.name}</title>
								</circle>
								<foreignObject
									width={item.r * 1.6}
									height={item.r * 1.6}
									x={item.r * -0.8}
									y={item.r * -0.8}
								>
									<body
										style={{
											height: item.r * 1.6,
											width: item.r * 1.6,
											display: 'flex',
											justifyContent:
												'center',
											alignItems: 'center'
										}}
										title={item.name}
										// xmlns='http://www.w3.org/1999/xhtml' // TODO: Find out how to make xmlns work with React and Typescript
										onClick={() =>
											bubbleClick &&
											bubbleClick(item)
										}
									>
										<p
											style={{
												margin: 0,
												textAlign: 'center',
												fontSize: `${
													100 -
													Math.pow(
														maxValue -
															item.value,
														1.8
													)
												}%`
											}}
											title={item.name}
											onClick={() =>
												bubbleClick &&
												bubbleClick(item)
											}
										>
											{item.name}
										</p>
									</body>
								</foreignObject>
							</g>
						))}
					</g>
					{groupValues.length > 1 && (
						<text
							x={16}
							y={24}
							style={{ fontSize: '90%' }}
						>
							{title || 'Other'}
						</text>
					)}
				</g>
			);
		}
	)}
</g>
{[...lineSequence(tileColumns, tileWidth)].map((x) => (
	<line
		key={x}
		x1={x}
		y1={0}
		x2={x}
		y2={svgHeight}
		stroke="black"
		strokeDasharray="2, 2"
	/>
))}
{[...lineSequence(tileRows, tileHeight)].map((y) => (
	<line
		key={y}
		x1={0}
		y1={y}
		x2={svgWidth}
		y2={y}
		stroke="black"
		strokeDasharray="2, 2"
	/>
))} -->
