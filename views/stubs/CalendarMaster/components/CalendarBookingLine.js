/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Popover, Button, Avatar } from 'antd';

const CalendarBookingLine = ({ booking }) => {
  const [isVisible, setIsVisible] = useState(false);
  const content = (
    <>
      <div className="calendar__booking-popover">
        <div className="d-flex align-items-flex-start mb-8 mb-md-0 mb-lg-8">
          <Avatar
            className="flex-none"
            size={32}
            src="https://placeimg.com/32/32/people"
          />
          <div className="d-flex flex-column ml-8">
            <span className="font-600">Rodney Harmon</span>
            <span className="font-12 text-color-gray">Dec 4 - Dec 5, 2020</span>
          </div>
        </div>
        <Button className="ml-auto" href="#" type="secondary" size="small">
          View Details
        </Button>
      </div>
      <Button
        className="ant-btn-close calendar__booking-popover-close"
        onClick={() => setIsVisible(false)}
        icon={<i className="icon icon-cross" />}
        size="small"
      />
    </>
  );

  return (
    <Popover
      visible={isVisible}
      content={content}
      placement="topLeft"
      trigger="click"
      onVisibleChange={setIsVisible}
      overlayClassName="ant-popover-calendar"
    >
      <div
        className={classNames('calendar__body-cell-booking', {
          'calendar__body-cell-booking--before-range': booking.beforeRange,
          'calendar__body-cell-booking--after-range': booking.afterRange,
          'calendar__body-cell-booking--is-active': isVisible,
        })}
        style={{ ...booking.position }}
      >
        <span className="calendar__body-cell-booking-info">
          <i className="icon icon-seats font-14" />
          {' '}
          {booking.details.peopleCount}
          {' '}
          <i className="icon icon-moon font-14" />
          {' '}
          {booking.details.nightsCount}
          {' '}
          {`$${booking.details.total}`}
        </span>
      </div>
    </Popover>
  );
};

export default CalendarBookingLine;
