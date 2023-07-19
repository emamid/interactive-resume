import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MDContentProps {
	markdown?: string | null;
}

const MDContent: React.FC<MDContentProps> = ({ markdown }: MDContentProps) => {
	return (
		<div>
			<ReactMarkdown
				className="mb-3 text-gray-500 dark:text-gray-400"
				children={markdown || ''}
				linkTarget={href => href?.includes('//') ? '_blank' : ''}
				transformLinkUri={href => href?.replace('./#', '../')}
			/>
		</div>
	);
};

export default MDContent;
