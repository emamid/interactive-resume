import MDContent from '@/components/MDContent';
import YearRange from '@/components/YearRange';

import { Project } from '@/types';

async function getProject(id: string): Promise<Project> {
	const response = await fetch(
		`http://localhost:3001/api/rest/v1/projects/${id}`
	);

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	const data = await response.json();
	return data;
}

export default async function Project({ params }: { params: { id: string } }) {
	const project = await getProject(params.id);

	const employerText = project?.isPersonal ? (
		''
	) : (
		<span>
			{' '}
			at{' '}
			<a href={`./#/employers/${project?.employerID}`}>
				{project?.Employer.name}
			</a>{' '}
			<YearRange
				startDate={project?.startDate}
				endDate={project?.endDate}
				withParens={true}
			/>
		</span>
	);

	return (
		<>
			<h5>
			{project?.name}
				{employerText}
			</h5>
			<MDContent markdown={project?.markdownContent} />
		</>
	);
}
