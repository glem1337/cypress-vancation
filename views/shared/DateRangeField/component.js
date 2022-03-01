import ReactCalendar from 'react-calendar';
import PropTypes from 'prop-types';
import { Button, Form } from 'antd';
import { FormattedMessage } from 'react-intl';
import { getIn } from 'formik';
import classNames from 'classnames';

import isMobileView from 'utils/breakpoints/isMobileView';

import InputHelp from 'views/shared/InputHelp';
import React from 'react';

const DateRangeField = ({
  form: { touched, errors },
  field,
  onDateRangeChange,
  onActiveStartDateChange,
  dateRange,
  formatShortWeekday,
  tileContent,
  tileDisabled,
  clearDateRange,
  calendarOpen,
  calendarVisible,
}) => {
  const fieldTouched = getIn(touched, field.name);
  const fieldErrors = getIn(errors, field.name);
  const HelperErrorOrTouched = fieldTouched && fieldErrors && (
    <InputHelp type="danger" text={fieldErrors} />
  );

  return (
    <div
      className={classNames('main-date-range', {
        'main-date-range--calendar-visible': calendarVisible,
      })}
    >
      <div
        onClick={calendarOpen}
        className="main-date-range__input-wrapper"
        role="button"
      >
        <Form.Item
          className="mb-0 w-100"
          validateStatus={fieldTouched && fieldErrors && 'error'}
          help={HelperErrorOrTouched}
        >
          <div className="departure-return__widget">
            <div className="departure-return__side">
              <span className="departure-return__title">
                <FormattedMessage id="shared.startDate" />
              </span>
              <span className="departure-return__date">
                {dateRange.startDate}
              </span>
            </div>
            <div className="departure-return__vr" />
            <div className="departure-return__side">
              <span className="departure-return__title">
                <FormattedMessage id="shared.endDate" />
              </span>
              <span className="departure-return__date">
                {dateRange.endDate}
              </span>
            </div>
          </div>
        </Form.Item>
      </div>
      <div id="main-date-range__calendar" className="main-date-range__calendar">
        <ReactCalendar
          onChange={onDateRangeChange}
          onActiveStartDateChange={onActiveStartDateChange}
          selectRange
          value={field.value}
          showDoubleView={!isMobileView()}
          formatShortWeekday={formatShortWeekday}
          tileContent={tileContent}
          tileDisabled={tileDisabled}
          calendarType="US"
        />
        <Button
          onClick={clearDateRange}
          type="link"
          className="ml-md-20 mb-md-20"
        >
          <FormattedMessage id="shared.clear" />
        </Button>
      </div>
    </div>
  );
};

DateRangeField.propTypes = {
  calendarVisible: PropTypes.bool.isRequired,
  onDateRangeChange: PropTypes.func.isRequired,
  onActiveStartDateChange: PropTypes.func.isRequired,
  formatShortWeekday: PropTypes.func.isRequired,
  tileContent: PropTypes.func.isRequired,
  tileDisabled: PropTypes.func.isRequired,
  clearDateRange: PropTypes.func.isRequired,
  calendarOpen: PropTypes.func.isRequired,
  dateRange: PropTypes.shape().isRequired,
  field: PropTypes.shape().isRequired,
  form: PropTypes.shape().isRequired,
};

export default DateRangeField;
