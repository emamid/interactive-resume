import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography';

const HTMLContent = (props) => {
	const { html } = props;
	return (
		<Typography align="left"><span dangerouslySetInnerHTML={{__html: html}}/></Typography>		
	)
}

HTMLContent.propTypes = {
	html: PropTypes.string
}

export default HTMLContent;