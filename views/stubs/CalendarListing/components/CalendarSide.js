/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'antd';
import DefaultNightlyRate from './sideMenuItems/DefaultNightlyRate';
import BaseDiscounts from './sideMenuItems/BaseDiscounts';
import DefaultMinNightStay from './sideMenuItems/DefaultMinNightStay';
import CalendarAvailability from './sideMenuItems/CalendarAvailability';
import PreparationTime from './sideMenuItems/PreparationTime';
import PickupTime from './sideMenuItems/PickupTime';
import NightlyRate from './sideMenuItems/NightlyRate';
import MinNightStay from './sideMenuItems/MinNightStay';

const CalendarSide = ({ closeHandler, settings }) => (
  <>
    <div className="calendar-listing__side">
      <div className="calendar-listing__side-head">
        <div className="text-title">
          {settings === 'default' && 'Default Settings'}
          {settings === 'custom_day' && 'Dec 4'}
          {settings === 'custom_range' && 'Dec 21 - Dec 27'}
        </div>
        <Button
          className="align-self-start ml-16"
          type="secondary"
          icon={<i className="icon icon-cross" />}
          shape="circle"
          size="large"
          onClick={closeHandler}
        />
      </div>
      <div className="calendar-listing__side-main">
        {settings === 'default' ? (
          <>
            <DefaultNightlyRate />
            <BaseDiscounts defaultSettings />
            <DefaultMinNightStay />
            <CalendarAvailability />
            <PreparationTime />
            <PickupTime />
          </>
        ) : (
          <>
            <div className="btns-group mb-8">
              {/* Add btns-group-active class to the active button */}
              <Button className="btns-group-active" size="small">
                Available
              </Button>
              <Button size="small">Blocked</Button>
            </div>
            <NightlyRate range={settings === 'custom_range'} />
            <BaseDiscounts />
            <MinNightStay />
          </>
        )}
      </div>
    </div>
    <div
      className="calendar-listing__side-overlay"
      role="button"
      onClick={closeHandler}
    />
  </>
);

export default CalendarSide;
