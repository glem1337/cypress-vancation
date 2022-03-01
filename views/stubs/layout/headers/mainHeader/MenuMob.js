/* eslint-disable react/prop-types */
import { useState } from 'react';
import classNames from 'classnames';
import { Avatar, Divider } from 'antd';
import DestinationPopover from './DestinationPopover';

const MenuMob = ({ visible, menuToggle }) => {
  const [openInnerMenu, setOpenInnerMenu] = useState(false);

  return (
    <aside
      className={`main-account-menu ${visible && 'main-account-menu--open'}`}
    >
      {/* When menu is open, need to add main-account-menu--open and class
      "scroll-hidden" to body */}
      <div className="main-account-header">
        <button
          className="main-account-header-burger"
          type="button"
          onClick={menuToggle}
        >
          <i className="icon icon-cross" />
        </button>
        <div className="d-xl-none mr-16">
          <img src="/images/logo/logo-colored.svg" alt="" />
        </div>
      </div>
      <div className="main-account-menu__user">
        {/* On tablet use size of avatar - 60 */}
        <Avatar
          className="mr-12"
          src="https://randomuser.me/api/portraits/women/87.jpg"
        />
        <div className="flex-1 overflow-hidden">
          <div className="main-account-menu__user-name text-truncate">
            Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr.
          </div>
          <div className="main-account-menu__user-email text-truncate">
            hubert_blaine_wolfeschlegelsteinhausenbergerdorff_sr_2021@gmail.com
          </div>
        </div>
      </div>
      <Divider className="mb-8" />
      <div>
        <div
          role="button"
          className="main-account-menu__item"
          onClick={() => setOpenInnerMenu(!openInnerMenu)}
        >
          <span className="main-account-menu__item-txt">Destinations</span>
          <i className="icon icon-right in-black font-16 ml-auto ml-md-0" />
        </div>
        <div className="main-account-menu__item">
          <span className="main-account-menu__item-txt">Messages</span>
          <span className="main-account-header__item-counter">2</span>
        </div>
        <div className="main-account-menu__item">
          <span className="main-account-menu__item-txt">Notifications</span>
          <span className="main-account-header__item-counter">2</span>
        </div>
      </div>
      <Divider className="mb-8" />
      <div className="d-flex flex-column flex-grow-1">
        <a href="" className="main-dropdown__item text-color-gray">
          Account
        </a>
        <a href="" className="main-dropdown__item text-color-gray">
          Trips
        </a>
        <a href="" className="main-dropdown__item text-color-gray">
          Favorites
        </a>
        <a href="" className="main-dropdown__item text-color-gray">
          Help &#38; FAQ
        </a>
        <a href="" className="main-dropdown__item in-blue-1000">
          List Your Camper
        </a>
        <a href="" className="main-dropdown__item mt-auto in-gray-700">
          <i className="icon icon-log-out in-gray-700 mr-8" />
          Log Out
        </a>
      </div>
      <div
        className={classNames('main-account-header__inner-menu', {
          'main-account-header__inner-menu--open': openInnerMenu,
        })}
      >
        <div className="main-account-header__inner-menu-btn">
          <div className="container">
            <div
              role="button"
              className="in-black"
              onClick={() => setOpenInnerMenu(!openInnerMenu)}
            >
              <i className="icon icon-left mr-8 in-gray-500" />
              Destinations
            </div>
          </div>
        </div>
        <div className="container mt-24">
          <DestinationPopover />
        </div>
      </div>
    </aside>
  );
};

export default MenuMob;
