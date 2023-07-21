import Link from 'next/link';

import MDContent from '@/components/MDContent';
import YearRange from '@/components/YearRange';

import prismaClient from '@/utils/prismaClient';
import type { IDPageParams } from '@/types';

export default async function Project({ params: { id } }: IDPageParams) {

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
			Tags: {
				select: {
					Tag: {						
						select: {
							id: true,
							name: true,
						}
					},
				},
				orderBy: {
					Tag: {
						name: 'asc',
					},
				},		
			}
		},
		where: {
			id,
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
			{project?.Tags.map(tag => (<Link className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300 border border-gray-500" href={`/tags/${tag.Tag.id}`}>{tag.Tag.name}</Link>))}
			<MDContent markdown={project?.markdownContent} />
		</>
	);
}
