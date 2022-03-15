import React, { useRef, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import useGetProjectTags from '../api/hooks/useGetProjectTags';

import * as d3 from 'd3';
import { map, uniq } from 'lodash';

import BubbleChart from '../components/BubbleChart';

interface VisualizeProps extends RouteComponentProps {}

const Visualize = ({ history }: VisualizeProps) => {
	const {
		status: projectTagsStatus,
		data: projectTags,
		error: projectTagsError,
		isFetching: isFetchingProjectTags
	} = useGetProjectTags();

	const chartDiv = useRef<HTMLDivElement>(null);

	const [colorBy, setColorBy] = useState<string>('category');
	const [groupBy, setGroupBy] = useState<string | false>(false);

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

	const colors = d3.scaleOrdinal(d3.schemeSet3);

	const colorValues = uniq(mappedTags.map((tag: any) => tag[colorBy])).sort();

	const colorMap = colorValues.reduce(
		(currentMap, value) => ({
			...currentMap,
			[value]: colors(value)
		}),
		{}
	);

	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<div style={{ marginBottom: '1em' }}>
				<FormControl variant="standard" style={{ width: '20em' }}>
					<InputLabel>Color by</InputLabel>
					<Select
						value={colorBy}
						onChange={(event) =>
							setColorBy(event.target.value || '')
						}
						label="Color by"
					>
						<MenuItem value={'category'}>Category</MenuItem>
						<MenuItem value={'layer'}>Layer</MenuItem>
						<MenuItem value={'value'}>Size</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					variant="standard"
					style={{ width: '20em', marginLeft: '1em' }}
				>
					<InputLabel>Group by</InputLabel>
					<Select
						value={groupBy}
						onChange={(event) => {
							setGroupBy(event?.target?.value as string);
						}}
						label="Group by"
					>
						<MenuItem value={0}>None</MenuItem>
						<MenuItem value={'category'}>Category</MenuItem>
						<MenuItem value={'layer'}>Layer</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div style={{ flexGrow: 1 }} ref={chartDiv}>
				<BubbleChart
					data={mappedTags}
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
			<div style={{ marginTop: '1em' }}>
				{map(colorMap, (color, text) => (
					<span
						style={{
							backgroundColor: color,
							margin: '5px',
							padding: '5px'
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
