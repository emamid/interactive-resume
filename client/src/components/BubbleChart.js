import React from 'react';
import * as d3 from 'd3';
import { groupBy, map, max, reduce, uniq } from 'lodash';

const BubbleChart = ({ colorByProp, data, groupByProp, bubbleClick, svgWidth, svgHeight, colorMap }) => {

	const maxValue = max(data.map(tag => tag.value));

	const groupValues = groupByProp ? uniq(data.map(item => item[groupByProp])).sort() : ['All'];
	const groupedData = groupByProp ? groupBy(data, groupByProp) : { All: data };

	const tileCount = groupValues.length;
	const tileColumns = Math.max(Math.ceil(Math.sqrt(tileCount)), 1);
	const tileRows = Math.max(Math.floor(Math.sqrt(tileCount)), 1);
	const tileWidth = svgWidth / tileColumns;
	const tileHeight = svgHeight / tileRows;
	const tileCenterX = tileWidth / 2
	const tileCenterY = tileHeight / 2;

	const groups = groupValues.reduce((currentGroups, groupValue, groupIndex) => {
		const group = groupedData[groupValue];
		d3.packSiblings(group);
		const extents = group.reduce((currentExtents, item) => {
			return {
				minX: Math.min(currentExtents.minX, item.x - item.r),
				minY: Math.min(currentExtents.minY, item.y - item.r),
				maxX: Math.max(currentExtents.maxX, item.x + item.r),
				maxY: Math.max(currentExtents.maxY, item.y + item.r),
			}
		}, { minX: 0, minY: 0, maxX: 0, maxY: 0 })
		return {
			...currentGroups,
			[groupValue]: {
				...extents,
				centerX: tileCenterX - ((extents.maxX + extents.minX) / 2),
				centerY: tileCenterY - ((extents.maxY + extents.minY) / 2),
				column: groupIndex % tileColumns,
				data: group,
				groupIndex,
				row: Math.floor(groupIndex / tileColumns),
				title: groupValue,
			}
		}
	}, {});

	const maxExtents = reduce(groups, (currentExtents, group) => ({
		minX: Math.min(currentExtents.minX, group.minX),
		minY: Math.min(currentExtents.minY, group.minY),
		maxX: Math.max(currentExtents.maxX, group.maxX),
		maxY: Math.max(currentExtents.maxY, group.maxY),
	}), {
		minX: 0, minY: 0, maxX: 0, maxY: 0
	});

	const maxGroupWidth = maxExtents.maxX - maxExtents.minX;
	const maxGroupHeight = maxExtents.maxY - maxExtents.minY;

	const tileScale = maxGroupWidth && maxGroupHeight ? Math.min(tileWidth / maxGroupWidth, tileHeight / maxGroupHeight) : 1;

	function* lineSequence(lineCount, lineSpacing) {
		for (let lineNum = 1; lineNum < lineCount; lineNum++) yield lineNum * lineSpacing;
	}

	return (
		<svg
			style={{
				height: "100%",
				width: "100%",
			}}
		>
			<g className="bubbles-area">
				{map(groups, ({ data: groupData, column, row, centerX, centerY, title }) => {
					return (<g key={title} transform={`translate(${column * tileWidth}, ${row * tileHeight})`}>
						<g transform={`translate(${centerX},${centerY}) scale(${tileScale})`}>
							{groupData.map(item => (<g key={item.id} transform={`translate(${item.x},${item.y})`}>
								<circle r={item.r * 0.95} style={{ fill: colorMap[item[colorByProp]] }} onClick={() => bubbleClick && bubbleClick(item)}>
									<title>{item.name}</title>
								</circle>
								<foreignObject width={item.r * 1.6} height={item.r * 1.6} x={item.r * -0.8} y={item.r * -0.8}>
									<body style={{ height: item.r * 1.6, width: item.r * 1.6, display: 'flex', justifyContent: 'center', alignItems: 'center' }} title={item.name} xmlns='http://www.w3.org/1999/xhtml' onClick={() => bubbleClick && bubbleClick(item)}>
										<p style={{
											margin: 0, textAlign: 'center', fontSize: `${100 - Math.pow(maxValue - item.value, 1.8)}%`
										}} title={item.name} onClick={() => bubbleClick && bubbleClick(item)}>{item.name}</p>
									</body>
								</foreignObject>
							</g>))}
						</g>
						{groupValues.length > 1 && (<text x={16} y={24} style={{ fontSize: '90%' }}>{title || 'Other'}</text>)}
					</g>)
				})}
			</g>
			{[...lineSequence(tileColumns, tileWidth)].map(x => (<line x1={x} y1={0} x2={x} y2={svgHeight} stroke="black" strokeDasharray={[2, 2]} />))}
			{[...lineSequence(tileRows, tileHeight)].map(y => (<line x1={0} y1={y} x2={svgWidth} y2={y} stroke="black" strokeDasharray={[2, 2]} />))}
		</svg>
	);

}

export default BubbleChart;