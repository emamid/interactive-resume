import React from 'react'
import PropTypes from 'prop-types'

const HTMLContent = (props) => {
	const { html } = props;
	return (
		<div className="MuiTypography-root MuiTypography-body1" dangerouslySetInnerHTML={{__html: html}}/>
	)
}

HTMLContent.propTypes = {
	html: PropTypes.string
}

export default HTMLContent;