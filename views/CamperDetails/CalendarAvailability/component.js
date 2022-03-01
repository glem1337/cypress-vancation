import React from 'react';
import { FormattedMessage } from 'react-intl';
import ReactCalendar from 'react-calendar';
import classnames from 'classnames';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import isMobileView from 'utils/breakpoints/isMobileView';
import useCalendarAvailability from 'utils/hooks/useCalendarAvailability';

import useContainer from './hook';

const CalendarAvailability = () => {
  const {
    containerRef,
    searchParams,
  } = useContainer();

  const {
    formatShortWeekday,
    tileContent,
    tileDisabled,
    onDateRangeChange,
    isCalendarFetching,
    onActiveStartDateChange,
  } = useCalendarAvailability();

  return (
    <div
      id="details-availability"
      ref={containerRef}
    >
      <p className="text-headline mb-24">
        <FormattedMessage id="shared.availability" />
      </p>
      <div
        id="campervan-availability__calendar-wrapper"
        className={
          classnames(
            'campervan-availability__calendar-wrapper',
            {
              'campervan-availability__calendar-wrapper--loading': isCalendarFetching,
            },
          )
        }
      >
        <ReactCalendar
          onChange={onDateRangeChange}
          onActiveStartDateChange={onActiveStartDateChange}
          selectRange
          value={searchParams?.dateRange}
          showDoubleView={!isMobileView()}
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
      </div>
    </div>
  );
};

export default CalendarAvailability;
