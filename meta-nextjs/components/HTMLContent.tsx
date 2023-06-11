import React from 'react';

interface HTMLContentProps {
	html?: string;
}

const HTMLContent: React.FC<HTMLContentProps> = ({ html }: HTMLContentProps) => {
	return (
		<div>
			<span dangerouslySetInnerHTML={{ __html: html || '' }} />
		</div>
	);
};

export default HTMLContent;
