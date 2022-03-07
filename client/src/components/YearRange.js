import React from 'react'
import PropTypes from 'prop-types'

const YearRange = (props) => {
	const { startDate, endDate, withParens } = props;
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
		return '';
	}
}

YearRange.propTypes = {
	startDate: PropTypes.string,
	endDate: PropTypes.string,
	withParens: PropTypes.bool
}

export default YearRange;