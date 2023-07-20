import MDContent from '@/components/MDContent';
import YearRange from '@/components/YearRange';

import prismaClient from '@/utils/prismaClient';

export default async function Employer({ params }: { params: { id: string } }) {

	const employer = await prismaClient.employers.findUnique({
		select: {
			id: true,
			name: true,
			position: true,
			markdownContent: true,
			startDate: true,
			endDate: true,
		},
		where: {
			id: params.id,
		}
	});
	
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
