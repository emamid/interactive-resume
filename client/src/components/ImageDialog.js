import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const ImageDialog = (props) => {
	const { image, onClose } = props;
	if (image) {
		return (		
			<Dialog open={Boolean(image.filename)} onClose={onClose} fullWidth={true} maxWidth="xl">
				<DialogContent>
					<img src={`http://localhost:3000/images/${image.filename}`}/>
					<DialogContentText>{image.caption}</DialogContentText>
				</DialogContent>
			</Dialog>
		)	
	} else {
		return '';
	}
}

ImageDialog.propTypes = {
	image: PropTypes.object,
	onClose: PropTypes.func	
}

export default ImageDialog;