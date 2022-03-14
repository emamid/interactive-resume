import React from 'react'

interface YearRangeProps {
	startDate?: string;
	endDate?: string;
	withParens?: boolean;
}

const YearRange = ({ startDate, endDate, withParens }: YearRangeProps) => {
	const startYear = startDate ? new Date(startDate).getFullYear() : null;
	const endYear = endDate ? new Date(endDate).getFullYear() : null;
	if (startYear || endYear) {
		const yearsStr = (startYear === endYear) ? startYear : (endYear ? `${startYear} - ${endYear}` : `${startYear} -`);
		if (withParens) {
			return <span>({yearsStr})</span>;
		} else {
			return <span>{yearsStr}</span>;
		}
	} else {
		return <span/>;
	}
}

export default YearRange;