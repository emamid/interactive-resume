import Link from 'next/link';

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
			References: {
				select: {
					Reference: {
						select: {
							name: true,
							url: true
						}
					}
				}
			}
		},
		where: {
			id: params.id
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
			<h5>References</h5>
			<ul>
				{employer?.References.map((reference) => (
					<li><Link href={`${reference.Reference.url}`} target='_blank'>{reference.Reference.name}</Link></li>
				))}
			</ul>
		</>
	);
}
