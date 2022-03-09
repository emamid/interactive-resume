import React from 'react';
import * as d3 from 'd3';
import { useD3 } from '../hooks/useD3';
import { max, uniq } from 'lodash';

const BubbleChart = ({ colorBy, data, groupBy, onclick, colorMapChanged, svgWidth, svgHeight }) => {
	const ref = useD3(
		(svg) => {
			const mappedTags = data.map(tag => ({
				tagID: tag.tagID,
				name: tag.Tag.name,
				category: tag.Tag.category,
				layer: tag.Tag.layer,
				projectCount: tag.projectCount,
				r: 4 + tag.projectCount * 11
			}));

			const maxProjectCount = max(mappedTags.map(tag => tag.projectCount));

			const colors = d3.scaleOrdinal(d3.schemePastel2);

			const colorValues = uniq(mappedTags.map(tag => tag[colorBy])).sort();

			const colorMap = colorValues.reduce((currentMap, value, index) => ({
				...currentMap,
				[value]: colors(index)
			}), {});

			if (colorMapChanged) {
				colorMapChanged(colorMap);
			}
			
			const packed = d3.packSiblings(mappedTags);

			const bubblesArea = svg.select('.bubbles-area');

			const items = bubblesArea.selectAll('.bubble')
				.data(mappedTags)
				.enter()
				.append('g')
				.attr('transform', tag => `translate(${tag.x + svgWidth/2},${tag.y + svgHeight/2})`);
			
			items.append('circle')
				.attr('r', tag => tag.r * 0.95)
				.style('fill', tag => colorMap[tag[colorBy]])
				.on('click', event => {
					if (onclick) {
						onclick(event.target.__data__.tagID);
					}
				})
				.append('title')
				.text(tag => tag.name);

			items.append('foreignObject')
				.attr('width', tag => tag.r * 1.6)
				.attr('height', tag => tag.r * 1.6)
				.attr('x', tag => tag.r * -0.8)
				.attr('y', tag => tag.r * -0.8)
				.append('xhtml:body')				
				.style('height', tag => `${tag.r * 1.6} px`)
				.style('width', tag => `${tag.r * 1.6} px`)
				.style('display', 'flex')
				.style('justify-content', 'center')
				.style('align-items', 'center')
				.attr('title', tag => tag.name)
				.on('click', event => {
					if (onclick) {
						onclick(event.target.__data__.tagID);
					}
				})
				.append('xhtml:p')
				.style('height', tag => `${tag.r * 1.6} px`)
				.style('width', tag => `${tag.r * 1.6} px`)
				.style('margin', '0')
				.style('text-align', 'center')
				.style('font-size', tag => `${100 - Math.pow(maxProjectCount - tag.projectCount, 1.8)}%`)
				.attr('title', tag => tag.name)
				.text(tag => tag.name)

		},
		[data.length]);

	return (
		<svg
			ref={ref}
			style={{
				height: "100%",
				width: "100%",
			}}
		>
			<g className="bubbles-area" />
			<g className="legend" />
		</svg>
	);
}

export default BubbleChart;