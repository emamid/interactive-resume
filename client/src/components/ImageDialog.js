import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const ImageDialog = (props) => {
	const { image, onClose } = props;
	if (image) {
		return (		
			<Dialog open={Boolean(image.filename)} onClose={onClose} fullWidth={true} maxWidth="xl">
				<DialogTitle id="confirmation-dialog-title" style={{textAlign:'center'}}>{image.caption}</DialogTitle>
				<DialogContent dividers>
					<img src={`/images/${image.filename}`} alt={image.caption} style={{maxHeight:'90%', maxWidth:'90%', display:'block', marginLeft:'auto', marginRight:'auto'}}/>
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