import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography';

const ReferenceList = (props) => {

	const { references } = props;

	if (references && references.length) {
		return (
			<div>
				<Typography component="h6" variant="h6">References</Typography>
				<ul>
					{references.map(reference => (
						<li key={reference.id}><a href={reference.url} target="_blank">{reference.name}</a></li>
					))}
				</ul>
			</div>
		)
	} else {
		return '';
	}
}

ReferenceList.propTypes = {
	references: PropTypes.array
}

export default ReferenceList;