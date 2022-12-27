import { MouseEventHandler } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Image } from '@/api/types';

import './ImageDialog.css';

interface ImageDialogProps {
	image?: Image;
	onClose: MouseEventHandler;
}

const ImageDialog = ({ image, onClose }: ImageDialogProps) => {
	if (image) {
		return (
			<Dialog
				open={Boolean(image.filename)}
				onClose={onClose}
				fullWidth={true}
				maxWidth="xl"
				onClick={onClose}
			>
				<DialogTitle
					id="confirmation-dialog-title"
					className="dialog-title"
				>
					{image.caption}
				</DialogTitle>
				<DialogContent dividers>
					<img
						src={`/images/${image.filename}`}
						alt={image.caption}
						className="dialog-image"
					/>
				</DialogContent>
			</Dialog>
		);
	} else {
		return <span/>;
	}
};

export default ImageDialog;
