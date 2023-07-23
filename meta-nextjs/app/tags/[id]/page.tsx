import Link from 'next/link';

import prismaClient from '@/utils/prismaClient';
import type { IDPageParams } from '@/types';

export default async function Tag({ params: { id } }: IDPageParams) {
	const tag = await prismaClient.tags.findUnique({
		select: {
			id: true,
			name: true,
			Projects: {
				select: {
					Project: {
						select: {
							id: true,
							name: true,
							Employer: {
								select: {
									name: true
								}
							}
						}
					}
				},
				orderBy: {
					Project: {
						name: 'asc'
					}
				}
			}
		},
		where: {
			id
		}
	});

	return (
		<div>
			<h5>{tag?.name}</h5>
			<div className="flex flex-wrap">
				{tag?.Projects.map((project) => (
					<Link
						className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
						style={{width:'490px', margin: '12px'}}
						href={`/projects/${project.Project.id}`}
					>
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							{project.Project.name}
						</h5>
						<p className="font-normal text-gray-700 dark:text-gray-400">
							{project.Project.Employer.name}
						</p>
					</Link>
				))}
			</div>
		</div>
	);
}
