interface YearRangeProps {
	startDate?: Date | null;
	endDate?: Date | null;
	withParens?: boolean;
}

const YearRange = ({ startDate, endDate, withParens }: YearRangeProps) => {
	const startYear = startDate?.getFullYear();
	const endYear = endDate?.getFullYear();
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