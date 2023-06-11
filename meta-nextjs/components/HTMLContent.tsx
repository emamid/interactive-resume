import React from 'react';

interface HTMLContentProps {
	html?: string;
}

const HTMLContent: React.FC<HTMLContentProps> = ({ html }: HTMLContentProps) => {
	return (
		<div>
			<p className="mb-3 text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: html || '' }} />
		</div>
	);
};

export default HTMLContent;
