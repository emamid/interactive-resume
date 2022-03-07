import React from 'react';
import * as d3 from 'd3';
import { useD3 } from '../hooks/useD3';
import { uniq } from 'lodash';

const BubbleChart = ({ data, colorBy, groupBy }) => {
	const ref = useD3(
		(svg) => {
			const mappedTags = data.map(tag => ({
				tagID: tag.tagID,
				name: tag.Tag.name,
				category: tag.Tag.category,
				layer: tag.Tag.layer,
				projectCount: tag.projectCount,
				r: tag.projectCount * 10
			}));

			const colors = d3.scaleOrdinal(d3.schemeCategory10);

			const colorValues = uniq(mappedTags.map(tag => tag[colorBy])).sort();

			const colorMap = colorValues.reduce((currentMap, value, index) => ({
				...currentMap,
				[value]: colors(index)
			}), {});

			const packed = d3.packSiblings(mappedTags);

			const plotArea = svg.select('.plot-area');

			const bubbles = plotArea.selectAll('.bubble')
				.data(mappedTags)
				.enter()
				.append('circle')
				.attr('cx', tag => tag.x + 400)
				.attr('cy', tag => tag.y + 400)
				.attr('r', tag => tag.r * 0.9)
				.style('fill', tag => colorMap[tag[colorBy]])
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
			<g className="plot-area" />
		</svg>
	);
}

export default BubbleChart;