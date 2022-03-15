import React, { useEffect, useRef, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import * as d3 from 'd3';
import { map, uniq } from 'lodash';

import BubbleChart from '../components/BubbleChart';

import { loadProjectTags } from '../redux/Store';

interface VisualizeProps extends RouteComponentProps {
	projectTags: any[];
	loadProjectTags: Function;
}

const mapStateToProps = (state: any) => ({
	projectTags: state.projectTags
});

const mapDispatchToProps = {
	loadProjectTags
};

const Visualize = ({ projectTags, loadProjectTags, history }: VisualizeProps) => {

	useEffect(() => {
		loadProjectTags();
	}, [loadProjectTags]);

	const chartDiv = useRef<HTMLDivElement>(null);

	const [colorBy, setColorBy] = useState<string>('category');
	const [groupBy, setGroupBy] = useState<string | false>(false);

	// Ensure non-zero dimensions if rendering before everything finalizes
	const svgWidth = (chartDiv.current && chartDiv.current.clientWidth) || 128;
	const svgHeight = (chartDiv.current && chartDiv.current.clientHeight) || 128;

	const mappedTags = projectTags.map(tag => ({
		id: tag.tagID,
		name: tag.Tag.name,
		category: tag.Tag.category,
		layer: tag.Tag.layer,
		value: tag.projectCount,
		r: 4 + tag.projectCount * 11
	}));

	const colors = d3.scaleOrdinal(d3.schemeSet3);

	const colorValues = uniq(mappedTags.map((tag: any) => tag[colorBy])).sort();

	const colorMap = colorValues.reduce((currentMap, value, index) => ({
		...currentMap,
		[value]: colors(value) //TODO: Check this, was index with JS but TS says it's a string
	}), {});

	return (<div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
		<div style={{marginBottom:'1em'}}>
			<FormControl variant="standard" style={{width:'20em'}}>
				<InputLabel>Color by</InputLabel>
				<Select
					value={colorBy}
					// onChange={event => setColorBy(event.target.value || '')}  //TODO: Fix after upgrading Material UI
					// label="Color by" //TODO: Fix after upgrading Material UI
				>
					<MenuItem value={'category'}>Category</MenuItem>
					<MenuItem value={'layer'}>Layer</MenuItem>
					<MenuItem value={'value'}>Size</MenuItem>
				</Select>
			</FormControl>
			<FormControl variant="standard" style={{width:'20em', marginLeft:'1em'}}>
				<InputLabel>Group by</InputLabel>
				<Select
					value={groupBy}
					// onChange={event => { setGroupBy(event?.target?.value as string)}} // TODO: Fix after setting allowJs = false
					// label="Group by" //TODO: Fix after upgrading Material UI
				>
					<MenuItem value={0}>None</MenuItem>
					<MenuItem value={'category'}>Category</MenuItem>
					<MenuItem value={'layer'}>Layer</MenuItem>
				</Select>
			</FormControl>
		</div>
		<div style={{ flexGrow: 1 }} ref={chartDiv}>
			<BubbleChart data={mappedTags}
				colorByProp={colorBy}
				groupByProp={groupBy ? groupBy as string: undefined}
				svgWidth={svgWidth}
				svgHeight={svgHeight}
				bubbleClick={
					(item: any) => {
						history.push(`/tags/${item.id}`)
					}
				}
				colorMap={colorMap}
			/>
		</div>
		<div style={{marginTop:'1em'}}>{map(colorMap, (color, text) => <span style={{ backgroundColor: color, margin: '5px', padding: '5px' }} key={text}>{text === 'null' ? 'Other' : text}</span>)}</div>
	</div>
	)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visualize));
