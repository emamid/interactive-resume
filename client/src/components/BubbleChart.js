import React from 'react';
import * as d3 from 'd3';
import { each, groupBy, max, uniq } from 'lodash';

const BubbleChart = ({ colorByProp, data, groupByProp, bubbleClick, svgWidth, svgHeight, colorMap }) => {

	const maxValue = max(data.map(tag => tag.value));

	let groupValues = ['All'];
	let groupedData = { All: data };

	if (groupByProp) {
		groupValues = uniq(data.map(item => item[groupByProp])).sort();
		groupedData = groupBy(data, groupByProp);		
	}

	each(groupedData, group => d3.packSiblings(group));

	const tileCount = groupValues.length;
	const tileColumns = Math.max(Math.ceil(Math.sqrt(tileCount)), 1);
	const tileRows = Math.max(Math.floor(Math.sqrt(tileCount)), 1);
	const tileWidth = svgWidth / tileColumns;
	const tileHeight = svgHeight / tileRows;
	const naiveTileScale = 1 / Math.max(tileColumns, tileRows);
	const fixedTileScale = 0.95;
	const fixedTileScaleWeight = 1;
	const naiveTileScaleWeight = 1;

	const bubbleExtents = data.reduce((currentExtents, item) => {
		// console.log('currentExtents = ', currentExtents, ' item = ', item, ' item.x=', item.x);
		// console.log(`minX=${currentExtents.minX} x=${item.x} r=${item.r} x-r=${item.x - item.r} ${Math.min(currentExtents.minX, item.x - item.r)}`);
		// console.log(`item = ${JSON.stringify(item)} item.x = ${item.x}`);
		return {
		minX: Math.min(currentExtents.minX, item.x - item.r),
		minY: Math.min(currentExtents.minY, item.y - item.r),
		maxX: Math.max(currentExtents.maxX, item.x + item.r),
		maxY: Math.max(currentExtents.maxY, item.y + item.r),
	}}, {minX:0, minY:0, maxX:0, maxY:0})

	const maxGroupWidth = bubbleExtents.maxX - bubbleExtents.minX;
	const maxGroupHeight = bubbleExtents.maxY - bubbleExtents.minY;

	const tileScale = maxGroupWidth && maxGroupHeight ? Math.min(tileWidth / maxGroupWidth, tileHeight / maxGroupHeight) : 1;

	// const tileScale = ((fixedTileScale * fixedTileScaleWeight) + (naiveTileScale * naiveTileScaleWeight)) / (fixedTileScaleWeight + naiveTileScale);

	function* lineSequence(lineCount, lineSpacing) {
		for (let lineNum = 1; lineNum<lineCount; lineNum++) yield lineNum * lineSpacing;
	}

	return (
		<svg
			style={{
				height: "100%",
				width: "100%",
			}}
		>
			<g className="bubbles-area">
				{groupValues.map((groupValue, groupIndex) => {
					const column = groupIndex % tileColumns;
					const row = Math.floor(groupIndex / tileColumns);
					const groupData = groupedData[groupValue];
					return (<g key={groupValue} transform={`translate(${column * tileWidth}, ${row * tileHeight})`}>
						{/* <rect width={tileWidth} height={tileHeight} fill='white' stroke='grey' /> */}
						<g transform={`translate(${tileWidth / 2},${tileHeight / 2}) scale(${tileScale})`}>
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
						{groupValues.length>1 && (<text x={16} y={24} style={{fontSize:'90%'}}>{groupValue || 'Other'}</text>)}
					</g>)
				})}
			</g>
			{[...lineSequence(tileColumns, tileWidth)].map(x => (<line x1={x} y1={0} x2={x} y2={svgHeight} stroke="black" strokeDasharray={[2,2]}/>))}
			{[...lineSequence(tileRows, tileHeight)].map(y => (<line x1={0} y1={y} x2={svgWidth} y2={y} stroke="black" strokeDasharray={[2,2]}/>))}
		</svg>
	);

}

export default BubbleChart;