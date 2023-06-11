import { Myself } from '@/types';

import YearRange from '@/components/YearRange';
import HTMLContent from '@/components/HTMLContent';

import { Employers } from '@/types';

async function getEmployers(): Promise<Employers> {
	const response = await fetch('http://localhost:3001/api/rest/v1/employers');

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	const data = await response.json();
	return data;
}

async function getMyself(): Promise<Myself> {
	const response = await fetch('http://localhost:3001/api/rest/v1/myself');

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	const data = await response.json();
	return data;
}

export default async function Home() {
	const myself = await getMyself();
	const employers = await getEmployers();
	return (
		<>
			<HTMLContent html={myself?.pageContent || ''} />
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
						{employers.map(employer => (
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									<YearRange startDate={employer.startDate} endDate={employer.endDate} />
								</th>
								<td className="px-6 py-4">{employer.name}</td>
								<td className="px-6 py-4">{employer.position}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
