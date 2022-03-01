/* eslint-disable react/prop-types */
import classNames from 'classnames';

import { Avatar, Divider } from 'antd';
import MasterView from './MasterView';

const MenuMob = ({ visible, onMenuClose }) => (
  <aside
    className={classNames(
      'main-account-menu',
      visible && 'main-account-menu--open',
    )}
  >
    <div className="main-account-header">
      <button
        className="main-account-header-burger"
        onClick={onMenuClose}
        type="button"
      >
        <i className="icon icon-cross" />
      </button>
      <div>
        <img src="/images/logo/logo-circle.svg" alt="" />
      </div>
      <div className="main-account-header__title">Owner’s Dashboard</div>
    </div>
    <MasterView />
    <div>
      <div className="main-account-menu__item">
        <span className="main-account-menu__item-txt">Messages</span>
        <span className="main-account-header__item-counter">2</span>
      </div>
      <div className="main-account-menu__item">
        <span className="main-account-menu__item-txt">Calendar</span>
      </div>
      <div className="main-account-menu__item">
        <span className="main-account-menu__item-txt">Reservations</span>
        <span className="main-account-header__item-counter">2</span>
      </div>
      <div className="main-account-menu__item">
        <span className="main-account-menu__item-txt">Reporting</span>
      </div>
      <div className="main-account-menu__item">
        <span className="main-account-menu__item-txt">View All Campers</span>
      </div>
    </div>
    <Divider className="mb-8" />
    <div className="main-account-menu__user">
      {/* On tablet use size of avatar - 60 */}
      <Avatar
        className="mr-12"
        src="https://randomuser.me/api/portraits/women/87.jpg"
      />
      <div>
        <div className="main-account-menu__user-name">Rodney Harmon</div>
        <div className="main-account-menu__user-email">
          rodney.harmon@gmail.com
        </div>
      </div>
    </div>
    <Divider className="mb-8" />
    <div className="d-flex flex-column flex-grow-1">
      <a href="" className="main-dropdown__item in-blue-1000">
        List Your Camper
      </a>
      <a href="" className="main-dropdown__item text-color-gray">
        Help & FAQ
      </a>
      <a href="" className="main-dropdown__item text-color-gray">
        View Business Profile
      </a>
      <a href="" className="main-dropdown__item text-color-gray">
        Notifications Settings
      </a>
      <a href="" className="main-dropdown__item text-color-gray">
        Payout Preferences
      </a>
      <a href="" className="main-dropdown__item mt-auto in-gray-700">
        <i className="icon icon-log-out in-gray-700 mr-8" />
        Log Out
      </a>
    </div>
  </aside>
);

export default MenuMob;
