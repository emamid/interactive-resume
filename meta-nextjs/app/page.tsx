import { PrismaClient } from '@prisma/client';

import Link from 'next/link';

import YearRange from '@/components/YearRange';
import MDContent from '@/components/MDContent';

export default async function Home() {
	const prisma = new PrismaClient();
	const myself = await prisma.myself.findFirst();
	const employers = await prisma.employers.findMany({
		select: {
			id: true,
			name: true,
			position: true,
			startDate: true,
			endDate: true
		},
		orderBy: {
			startDate: 'desc'
		},
		where: {
			id: {
				not: myself?.personalEmployerID
			}
		}
	});
	const personalProjects = await prisma.projects.findMany({
		select: {
			id: true,
			name: true,
			startDate: true,
			endDate: true
		},
		orderBy: {
			name: 'asc'
		},
		where: {
			employerID: myself?.personalEmployerID
		}
	});

	return (
		<>
			<MDContent markdown={myself?.markdownContent} />
			<h5>Employment History</h5>
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Dates
							</th>
							<th scope="col" className="px-6 py-3">
								Company
							</th>
							<th scope="col" className="px-6 py-3">
								Position
							</th>
						</tr>
					</thead>
					<tbody>
						{employers.map((employer) => (
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									<YearRange
										startDate={employer.startDate}
										endDate={employer.endDate}
									/>
								</th>
								<td className="px-6 py-4">
									<Link href={`/employers/${employer?.id}`}>
										{employer.name}
									</Link>
								</td>
								<td className="px-6 py-4">
									{employer.position}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<h5>Personal Projects</h5>
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Dates
							</th>
							<th scope="col" className="px-6 py-3">
								Project
							</th>
						</tr>
					</thead>
					<tbody>
						{personalProjects.map((project) => (
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									<YearRange
										startDate={project.startDate}
										endDate={project.endDate}
									/>
								</th>
								<td className="px-6 py-4">
									<Link href={`/project/${project?.id}`}>
										{project.name}
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
