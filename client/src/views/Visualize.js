import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
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

	const [ colorMap, setColorMap ] = useState({});

	return (<div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
		<div>Top bar</div>
		<div style={{ flexGrow: 1 }}>
			<BubbleChart data={projectTags}
			  colorBy="category"
			  groupBy="layer"
			  onclick={tagID => history.push('/tags/' + tagID)}
			  colorMapChanged={newColorMap => setColorMap(newColorMap)} />
		</div>
		<div>{map(colorMap, (color, text) => <span style={{backgroundColor: color, margin:'5px', padding:'5px'}}>{text === 'null' ? 'Other' : text}</span>)}</div>
	</div>
	)
}

Visualize.propTypes = {
	projectTags: PropTypes.array.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visualize));
