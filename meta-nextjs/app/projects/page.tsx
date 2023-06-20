import Link from 'next/link';

import YearRange from '@/components/YearRange';

import { Projects } from '@/types';

async function getProjects(): Promise<Projects> {
	const response = await fetch('http://localhost:3001/api/rest/v1/projects')
 
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
 
	const data = await response.json();	
  return data;
}

export default async function Projects() {

	const projects = await getProjects();

  return (
		<>		
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
							<th scope="col" className="px-6 py-3">
								Company
							</th>
						</tr>
					</thead>
					<tbody>
						{projects.map(project => (
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									<YearRange startDate={project.startDate} endDate={project.endDate} />
								</th>
								<td className="px-6 py-4"><Link href={`/projects/${project?.id}`}>{project.name}</Link></td>
								<td className="px-6 py-4"><Link href={`/employers/${project.employerID}`}>{project.Employer.name}</Link></td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

		</>
  )
}
