import React from 'react'
import PropTypes from 'prop-types'

const YearRange = (props) => {
    const { startDate, endDate } = props;
    const startYear = startDate ? new Date(startDate).getFullYear() : null;
    const endYear = endDate ? new Date(endDate).getFullYear() : null;
    if (startYear || endYear) {
        if (startYear === endYear) {
            return (
                <span>({startYear})</span>
            )        
        } else {
            return (
                <span>({startYear} - {endYear})</span>
            )        
        }
    } else {
        return '';
    }
}

YearRange.propTypes = {
	startDate: PropTypes.string,
	endDate: PropTypes.string
}

export default YearRange;