/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Button, Divider, Dropdown, Menu } from 'antd';

import CalendarSide from './components/CalendarSide';
import CalendarFooter from './components/CalendarFooter';

const CalendarListing = ({ editListing }) => {
  const [sideVisible, setSideVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [sideSettings, setSideSettings] = useState(null);
  const sideToggle = (e, settings) => {
    e.preventDefault();
    setSideSettings(settings);
    setSideVisible(!sideVisible);
  };
  const footerToggle = (e) => {
    e.preventDefault();
    setFooterVisible(!footerVisible);
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <a href="#" onClick={(e) => sideToggle(e, 'default')}>
          Default Settings
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="#" onClick={footerToggle}>
          Prevent Double Bookings
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className={classNames(
        'calendar-listing__wrap',
        sideVisible && 'calendar-listing__wrap--side-open',
        footerVisible && 'calendar-listing__wrap--footer-open',
      )}
    >
      <div className="calendar-listing__inner">
        <div className="container">
          <div className="calendar-listing">
            {editListing && (
              <>
                <h1 className="text-headline mb-8">
                  Pricing &#38; availability
                </h1>
                <div className="d-flex align-items-center mb-24">
                  <p className="text-color-gray">
                    Manage your camper pricing and availability here.
                  </p>
                  <a
                    href="#"
                    className="d-none d-lg-block font-600 ml-auto"
                    onClick={(e) => sideToggle(e, 'default')}
                  >
                    Default Settings
                  </a>
                </div>
              </>
            )}
            <div className="calendar-listing__head">
              <div className="d-flex align-items-center">
                <Button type="secondary" shape="circle" size="small">
                  <i className="icon icon-left font-14" />
                </Button>
                <div className="text-subheader font-700 ml-16 mr-16">
                  <span>December</span>
                  <span className="text-color-gray font-400 ml-8">2020</span>
                </div>
                <Button type="secondary" shape="circle" size="small">
                  <i className="icon icon-right font-14" />
                </Button>
              </div>
              <div className="calendar-listing__head-pricing">
                <Dropdown
                  overlay={menu}
                  trigger={['click']}
                  placement="bottomRight"
                >
                  <Button
                    type="settings"
                    className="d-lg-none"
                    icon={<i className="icon icon-settings" />}
                  />
                </Dropdown>
                {!editListing && (
                  <a
                    href="#"
                    className="d-none d-lg-block font-600"
                    onClick={(e) => sideToggle(e, 'default')}
                  >
                    Default Settings
                  </a>
                )}
              </div>
            </div>
            <div className="calendar-listing__main">
              <p className="mb-16">Place for Calendar</p>
              <div className="mb-16">
                <a
                  href="#"
                  className="font-600"
                  onClick={(e) => sideToggle(e, 'custom_day')}
                >
                  Custom 1 Day Settings
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="font-600"
                  onClick={(e) => sideToggle(e, 'custom_range')}
                >
                  Custom Days Range Settings
                </a>
              </div>
            </div>
          </div>
          <Divider className="d-none d-lg-block mt-24" />
          <CalendarFooter clickHandler={footerToggle} />
        </div>
      </div>
      <CalendarSide
        closeHandler={(e) => {
          e.preventDefault();
          setSideVisible(false);
        }}
        settings={sideSettings}
      />
    </div>
  );
};

export default CalendarListing;
