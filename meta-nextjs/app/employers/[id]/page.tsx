import MDContent from '@/components/MDContent';
import YearRange from '@/components/YearRange';

import { Employer } from '@/types';

async function getEmployer(id: string): Promise<Employer> {
	const response = await fetch(
		`http://localhost:3001/api/rest/v1/employers/${id}`
	);

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	const data = await response.json();
	return data;
}

export default async function Employer({ params }: { params: { id: string } }) {
	const employer = await getEmployer(params.id);

	return (
		<>
			<h5>
				{employer?.position} at {employer?.name}{' '}
				<YearRange
					startDate={employer?.startDate}
					endDate={employer?.endDate}
					withParens={true}
				/>
			</h5>

			<MDContent markdown={employer?.markdownContent} />
		</>
	);
}
