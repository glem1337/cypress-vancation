import { useState } from 'react';
import { Badge, Select } from 'antd';

import UserDropdown from './UserDropdown';
import MenuMob from './MenuMob';

const { Option } = Select;

const HeaderOwnerDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuHandler = (isOpen) => {
    if (isOpen) {
      document.body.classList.add('scroll-hidden');
    } else {
      document.body.classList.remove('scroll-hidden');
    }
    setIsMenuOpen(isOpen);
  };

  return (
    <header className="main-account-header main-account-header--listing">
      <div className="d-flex align-items-center">
        <button
          className="main-account-header-burger"
          type="button"
          onClick={() => mobileMenuHandler(true)}
        >
          <i className="icon icon-menu" />
        </button>
        <img src="/images/logo/logo-circle.svg" alt="" />
        <div className="main-account-header__title">Owner’s Dashboard</div>
        <Select
          id="master-view-select"
          name="fieldName"
          className="main-input__field d-none d-lg-block"
          optionLabelProp="label"
          defaultValue="master-view"
          getPopupContainer={() => document.querySelector('.main-account-header')
          }
        >
          <Option value="master-view" label="master view">
            <li className="main-dropdown__item p-0">
              <div className="main-dropdown__item-pic-listing">
                <i className="icon icon-file-list in-black" />
              </div>
              <span className="font-600">Master View</span>
            </li>
          </Option>
          <Option value="Adventure" label="Adventure">
            <li className="main-dropdown__item p-0">
              <div
                className="main-dropdown__item-pic-listing"
                style={{
                  backgroundImage: 'url("https://bit.ly/2XW8tMw")',
                }}
              />
              <span className="text-truncate">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </li>
          </Option>
          <Option value="Forest" label="Forest">
            <li className="main-dropdown__item p-0">
              <div
                className="main-dropdown__item-pic-listing"
                style={{
                  backgroundImage: 'url("https://bit.ly/2XW8tMw")',
                }}
              />
              <span className="text-truncate">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </li>
          </Option>
          <Option value="select2" label="+2">
            <li className="main-dropdown__item p-0">
              <div
                className="main-dropdown__item-pic-listing"
                style={{
                  backgroundImage: 'url("https://bit.ly/2XW8tMw")',
                }}
              />
              <span className="text-truncate">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </li>
          </Option>
        </Select>
        <div className="main-account-header-notif--listing">
          <Badge dot>
            <i className="icon icon-notification-f in-black font-20" />
          </Badge>
        </div>
        <UserDropdown />
      </div>
      <div className="main-account-header__bottom">
        <div className="container">
          <ul className="d-flex">
            <li className="main-account-header__item active">
              <span className="main-account-header__item-txt">Messages</span>
              <span className="main-account-header__item-counter">2</span>
            </li>
            <li className="main-account-header__item">
              <span className="main-account-header__item-txt">Calendar</span>
            </li>
            <li className="main-account-header__item">
              <span className="main-account-header__item-txt">
                Reservations
              </span>
              <span className="main-account-header__item-counter">2</span>
            </li>
            <li className="main-account-header__item">
              <span className="main-account-header__item-txt">Reporting</span>
            </li>
            <li className="main-account-header__item">
              <span className="main-account-header__item-txt">
                View All Campers
              </span>
            </li>
          </ul>
        </div>
      </div>
      <MenuMob
        visible={isMenuOpen}
        onMenuClose={() => mobileMenuHandler(false)}
      />
    </header>
  );
};

export default HeaderOwnerDashboard;
