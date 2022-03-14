import React from 'react';

import Typography from '@material-ui/core/Typography';

export interface HTMLContentProps {
	html: string;
}

const HTMLContent = ({ html }: HTMLContentProps) => {
	return (
		<Typography>
			<span dangerouslySetInnerHTML={{ __html: html }} />
		</Typography>
	);
};

export default HTMLContent;
