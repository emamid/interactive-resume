import Link from 'next/link';

import MDContent from '@/components/MDContent';
import YearRange from '@/components/YearRange';

import prismaClient from '@/utils/prismaClient';
import type { IDPageParams } from '@/types';

export default async function Employer({ params: { id } }: IDPageParams) {
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
							id: true,
							name: true,
							url: true
						}
					}
				}
			}
		},
		where: {
			id,
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
			<ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
				{employer?.References.map((reference) => (
					<li key={reference.Reference.id}>
						<Link
							href={`${reference.Reference.url}`}
							target="_blank"
						>
							{reference.Reference.name}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}
