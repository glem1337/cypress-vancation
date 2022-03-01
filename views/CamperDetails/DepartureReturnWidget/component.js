import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ReactCalendar from 'react-calendar';
import classnames from 'classnames';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import useContainer from './hook';
import Skeleton from './Skeleton';

const DepartureReturnWidget = ({
  wrapperClasses,
  showPairMonth,
  showClearButton,
  popupClasses,
}) => {
  const {
    wrapperRef,
    onClickHandler,
    calendarRef,
    dateStrings,
    formatShortWeekday,
    tileContent,
    tileDisabled,
    onDateRangeChangeHandler,
    onActiveStartDateChange,
    isCalendarFetching,
    searchParams,
    isCamperFetching,
    clearDateRange,
  } = useContainer();

  if (isCamperFetching) {
    return <Skeleton />;
  }

  return (
    <div
      className={`departure-return__wrapper ${wrapperClasses}`}
    >
      <div
        className="departure-return__widget"
        ref={wrapperRef}
        role="button"
        onClick={onClickHandler}
      >
        <div className="departure-return__side">
          <span className="departure-return__title">
            <FormattedMessage id="shared.departure" />
          </span>
          <span className="departure-return__date">
            {dateStrings.departure}
          </span>
        </div>
        <div className="departure-return__vr" />
        <div className="departure-return__side">
          <span className="departure-return__title">
            <FormattedMessage id="shared.return" />
          </span>
          <span className="departure-return__date">
            {dateStrings.return}
          </span>
        </div>
      </div>
      <div
        className={`departure-return__calendar-wrapper departure-return__calendar-wrapper--invisible ${popupClasses}`}
        ref={calendarRef}
      >
        <div
          className={
            classnames(
              'campervan-availability__calendar-wrapper',
              { 'campervan-availability__calendar-wrapper--loading': isCalendarFetching },
            )
          }
        >
          <ReactCalendar
            onChange={onDateRangeChangeHandler}
            onActiveStartDateChange={onActiveStartDateChange}
            selectRange
            value={searchParams.dateRange}
            showDoubleView={showPairMonth}
            formatShortWeekday={formatShortWeekday}
            tileContent={tileContent}
            tileDisabled={tileDisabled}
            calendarType="US"
          />
          {isCalendarFetching && (
            <div className="campervan-availability__calendar-loader-wrapper">
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 88 }} spin />}
                className="search-page__spin"
              />
            </div>
          )}
          {showClearButton && (
            <div className="departure-return__clear-section">
              <span
                onClick={clearDateRange}
                role="button"
              >
                <FormattedMessage id="shared.clear" />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

DepartureReturnWidget.propTypes = {
  wrapperClasses: PropTypes.string,
  popupClasses: PropTypes.string,
  showPairMonth: PropTypes.bool,
  showClearButton: PropTypes.bool,
};

DepartureReturnWidget.defaultProps = {
  wrapperClasses: '',
  popupClasses: '',
  showPairMonth: true,
  showClearButton: false,
};

export default DepartureReturnWidget;
