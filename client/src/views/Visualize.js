import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import * as d3 from 'd3';
import { map, uniq } from 'lodash';

import BubbleChart from '../components/BubbleChart';

import { loadProjectTags } from '../redux/Store';

const mapStateToProps = state => ({
	projectTags: state.projectTags
});

const mapDispatchToProps = {
	loadProjectTags
};

const Visualize = (props) => {

	const { projectTags, loadProjectTags, history } = props;

	useEffect(() => {
		loadProjectTags();
	}, [loadProjectTags]);

	const chartDiv = useRef(null);

	const [colorBy, setColorBy] = useState('category');
	const [groupBy, setGroupBy] = useState(null);

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

	const colors = d3.scaleOrdinal(d3.schemePastel2);

	const colorValues = uniq(mappedTags.map(tag => tag[colorBy])).sort();

	const colorMap = colorValues.reduce((currentMap, value, index) => ({
		...currentMap,
		[value]: colors(index)
	}), {});

	return (<div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
		<div>
			<FormControl variant="standard" style={{width:'20em'}}>
				<InputLabel>Color by</InputLabel>
				<Select
					value={colorBy}
					onChange={event => setColorBy(event.target.value)}
					label="Color by"
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
					onChange={event => setGroupBy(event.target.value)}
					label="Group by"
				>
					<MenuItem value={null}>None</MenuItem>
					<MenuItem value={'category'}>Category</MenuItem>
					<MenuItem value={'layer'}>Layer</MenuItem>
				</Select>
			</FormControl>
		</div>
		<div style={{ flexGrow: 1 }} ref={chartDiv}>
			<BubbleChart data={mappedTags}
				colorBy={colorBy}
				groupBy="layer"
				svgWidth={svgWidth}
				svgHeight={svgHeight}
				bubbleClick={
					(item) => {
						history.push(`/tags/${item.id}`)
					}
				}
				colorMap={colorMap}
			/>
		</div>
		<div>{map(colorMap, (color, text) => <span style={{ backgroundColor: color, margin: '5px', padding: '5px' }} key={text}>{text === 'null' ? 'Other' : text}</span>)}</div>
	</div>
	)
}

Visualize.propTypes = {
	projectTags: PropTypes.array.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visualize));
