import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ReactCalendar from 'react-calendar';
import { LeftOutlined } from '@ant-design/icons';

import MonthManager from './MonthManager';
import Footer from './Footer';

const SearchDatesComponent = ({
  onClose,
  onDateRangeChanged,
  dateRange,
  formatShortWeekday,
  tileContent,
  activeStartDate,
  clearDateRange,
  loadPrevMonth,
  loadNextMonth,
  tileDisabled,
  search,
}) => (
  <div className="search-destinations" id="search-destinations">
    <div className="search-destinations__header">
      <button
        className="search-destinations__header-button"
        type="button"
        onClick={onClose}
      >
        <LeftOutlined className="search-destinations__icon" />
      </button>
      <span className="search-destinations__title">
        <FormattedMessage id="shared.whenIsYourTrip" />
      </span>
      <button
        className="search-destinations__header-clear"
        type="button"
        onClick={clearDateRange}
      >
        <FormattedMessage id="shared.clear" />
      </button>
    </div>
    <div className="search-destinations__calendar-wrapper">
      <ReactCalendar
        onChange={onDateRangeChanged}
        selectRange
        value={dateRange}
        formatShortWeekday={formatShortWeekday}
        tileContent={tileContent}
        tileDisabled={tileDisabled}
        showDoubleView
        activeStartDate={activeStartDate}
      />
      <MonthManager
        loadPrevMonth={loadPrevMonth}
        loadNextMonth={loadNextMonth}
      />
      <Footer search={search} />
    </div>
  </div>
);

SearchDatesComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDateRangeChanged: PropTypes.func.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  formatShortWeekday: PropTypes.func.isRequired,
  tileContent: PropTypes.func.isRequired,
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  clearDateRange: PropTypes.func.isRequired,
  loadPrevMonth: PropTypes.func.isRequired,
  loadNextMonth: PropTypes.func.isRequired,
  tileDisabled: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

SearchDatesComponent.defaultProps = {
  dateRange: null,
};

export default SearchDatesComponent;
