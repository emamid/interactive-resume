import { useRef, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';

import useGetProjectTags from '@/api/hooks/useGetProjectTags';

import * as d3 from 'd3';
import { map, uniq } from 'lodash';

import BubbleChart from '@/components/BubbleChart';
import { filterByValue, maxValue, valueRangeMin } from './value-range';

import './Visualize.css';

interface VisualizeProps extends RouteComponentProps {}

const Visualize = ({ history }: VisualizeProps) => {
	const { data: projectTags } = useGetProjectTags();

	const chartDiv = useRef<HTMLDivElement>(null);

	const [colorBy, setColorBy] = useState<string>(localStorage.getItem('visualize-colorBy') || 'category');
	const [groupBy, setGroupBy] = useState<string>(localStorage.getItem('visualize-groupBy') || '');

	// Ensure non-zero dimensions if rendering before everything finalizes
	const svgWidth = (chartDiv.current && chartDiv.current.clientWidth) || 128;
	const svgHeight =
		(chartDiv.current && chartDiv.current.clientHeight) || 128;

	const mappedTags =
		projectTags?.map((tag) => ({
			id: tag.tagID,
			name: tag.Tag.name,
			category: tag.Tag.category,
			layer: tag.Tag.layer,
			value: tag.projectCount,
			r: 4 + tag.projectCount * 11
		})) || [];
	const valueMax = maxValue(mappedTags);
	const [valueRange, setValueRange] = useState<[number, number]>([valueRangeMin, valueMax]);
	const [trackedMax, setTrackedMax] = useState(valueMax);
	if (trackedMax !== valueMax) {
		setTrackedMax(valueMax);
		setValueRange([valueRangeMin, valueMax]);
	}
	const visibleTags = filterByValue(mappedTags, {
		lower: valueRange[0],
		upper: valueRange[1]
	});

	const colors = d3.scaleOrdinal(d3.schemeSet3);

	const colorValues = uniq(visibleTags.map((tag: any) => tag[colorBy])).sort();

	const colorMap = colorValues.reduce(
		(currentMap, value) => ({
			...currentMap,
			[value]: colors(value)
		}),
		{}
	);

	return (
		<div className='visualize'>
			<div className="visualize-controls">
				<FormControl variant="standard" className="visualize-colorby-select">
					<InputLabel>Color by</InputLabel>
					<Select
						value={colorBy}
						onChange={(event) => {
							localStorage.setItem('visualize-colorBy', event?.target?.value);
							setColorBy(event.target.value || '');
						}}
						label="Color by"
					>
						<MenuItem value={'category'}>Category</MenuItem>
						<MenuItem value={'layer'}>Layer</MenuItem>
						<MenuItem value={'value'}>Size</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					variant="standard"
					className="visualize-groupby-select"
				>
					<InputLabel>Group by</InputLabel>
					<Select
						value={groupBy}
						onChange={(event) => {
							localStorage.setItem('visualize-groupBy', event?.target?.value);
							setGroupBy(event?.target?.value as string);
						}}
						label="Group by"
					>
						<MenuItem value={''}>None</MenuItem>
						<MenuItem value={'category'}>Category</MenuItem>
						<MenuItem value={'layer'}>Layer</MenuItem>
					</Select>
				</FormControl>
				<FormControl variant="standard" className="visualize-value-range">
					<InputLabel shrink>Value</InputLabel>
					<Slider
						value={valueRange}
						min={valueRangeMin}
						max={valueMax}
						step={1}
						valueLabelDisplay="auto"
						getAriaLabel={(index) => (index === 0 ? 'Minimum value' : 'Maximum value')}
						onChange={(_event, value) => {
							if (Array.isArray(value)) {
								setValueRange([value[0], value[1]]);
							}
						}}
					/>
				</FormControl>
			</div>
			<div ref={chartDiv} className="visualize-chart">
				<BubbleChart
					data={visibleTags}
					colorByProp={colorBy}
					groupByProp={groupBy ? (groupBy as string) : undefined}
					svgWidth={svgWidth}
					svgHeight={svgHeight}
					bubbleClick={(item: any) => {
						history.push(`/tags/${item.id}`);
					}}
					colorMap={colorMap}
				/>
			</div>
			<div className="visualize-legend">
				{map(colorMap, (backgroundColor, text) => (
					<span className="visualize-legend-item"
						style={{
							backgroundColor
						}}
						key={text}
					>
						{text === 'null' ? 'Other' : text}
					</span>
				))}
			</div>
		</div>
	);
};

export default withRouter(Visualize);
