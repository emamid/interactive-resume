import React from 'react';
import * as d3 from 'd3';
import { max } from 'lodash';

const BubbleChart = ({ colorBy, data, groupBy, bubbleClick, svgWidth, svgHeight, colorMap }) => {

	const maxValue = max(data.map(tag => tag.value));

	const packed = d3.packSiblings(data);

	const bubbleClickHandler = (event) => {
		console.log('event = ', event);
	}

	return (
		<svg
			style={{
				height: "100%",
				width: "100%",
			}}
		>
			<g className="bubbles-area" />
			{packed.map(item => (<g key={item.id} transform={`translate(${item.x + svgWidth / 2},${item.y + svgHeight / 2})`}>
				<circle r={item.r * 0.95} style={{ fill: colorMap[item[colorBy]] }} onClick={() => bubbleClick && bubbleClick(item)}>
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
		</svg>
	);

}

export default BubbleChart;