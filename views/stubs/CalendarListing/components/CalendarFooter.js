/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'antd';

const CalendarFooter = ({ clickHandler }) => (
  <div className="calenadr-listing__footer">
    <div className="calendar-listing__footer-head">
      Prevent double bookings
      <Button
        className="d-lg-none align-self-start ml-16"
        type="secondary"
        icon={<i className="icon icon-cross" />}
        shape="circle"
        size="large"
        onClick={clickHandler}
      />
    </div>
    <div className="calendar-listing__footer-main">
      <div className="mb-24">
        <p className="mb-24">Export your calendar from Vancation here.</p>
        <Button type="secondary">Export Calendar</Button>
      </div>
      <div>
        <p className="mb-24">
          Avoid double booking by adding calendars from other services you list
          your campers on. When added, the calendar will automatically sync with
          Vancation and you will see when you are booked on other services.
        </p>
        <ul className="mb-24">
          <li className="calendar-listing__footer-item">
            <span className="text-subheader font-400">Calendar name one</span>
            <div className="d-flex align-self-start ml-16">
              <Button
                className="mr-8"
                type="secondary"
                icon={<i className="icon icon-edit-pencil" />}
              />
              <Button type="delete" icon={<i className="icon icon-delete" />} />
            </div>
          </li>
          <li className="calendar-listing__footer-item">
            <span className="text-subheader font-400">Calendar name two</span>
            <div className="d-flex align-self-start ml-16">
              <Button
                className="mr-8"
                type="secondary"
                icon={<i className="icon icon-edit-pencil" />}
              />
              <Button type="delete" icon={<i className="icon icon-delete" />} />
            </div>
          </li>
        </ul>
        <Button type="secondary">Add Calendar</Button>
      </div>
    </div>
  </div>
);

export default CalendarFooter;
