import MDContent from '@/components/MDContent';
import YearRange from '@/components/YearRange';

import prismaClient from '@/utils/prismaClient';

export default async function Project({ params }: { params: { id: string } }) {

	const project = await prismaClient.projects.findUnique({
		select: {
			id: true,
			name: true,
			markdownContent: true,
			startDate: true,
			endDate: true,
			Employer: true,
			employerID: true,
			isPersonal: true,
		},
		where: {
			id: params.id,
		}
	});

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
