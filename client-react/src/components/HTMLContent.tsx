import React from 'react';

import Typography from '@mui/material/Typography';

interface HTMLContentProps {
	html?: string;
}

const HTMLContent = ({ html }: HTMLContentProps) => {
	return (
		<Typography>
			<span dangerouslySetInnerHTML={{ __html: html || '' }} />
		</Typography>
	);
};

export default HTMLContent;
