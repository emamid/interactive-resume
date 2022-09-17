import React from 'react';

import Typography from '@mui/material/Typography';

import { Reference } from '../api/types';

interface ReferenceListProps {
	references: Reference[];
}

const ReferenceList = ({ references }: ReferenceListProps) => {
	if (references && references.length) {
		return (
			<div>
				<Typography component="h6" variant="h6">
					References
				</Typography>
				<ul>
					{references.map((reference) => (
						<li key={reference.id}>
							<a
								href={reference.url}
								target="_blank"
								rel="noopener noreferrer"
							>
								{reference.name}
							</a>
						</li>
					))}
				</ul>
			</div>
		);
	} else {
		return <span/>;
	}
};

export default ReferenceList;
