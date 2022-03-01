import { Avatar } from 'antd';
import Dropdown from 'views/stubs/shared/dropdowns/Dropdown';
import React from 'react';

const UserDropdown = () => (
  <Dropdown
    icon={(
      <div id="main-account-header__user" className="relative">
        <Avatar
          className="d-none d-lg-block c-pointer"
          src="https://randomuser.me/api/portraits/women/87.jpg"
        />
      </div>
    )}
    placement="bottomRight"
    overlayClassName="main-account-header__user-dropdown"
    getPopupContainer={() => document.getElementById('main-account-header__user')
    }
  >
    <div className="main-dropdown-wrap">
      <div className="main-dropdown__body">
        <div className="main-dropdown__item pt-8 pb-16">
          <Avatar
            size="large"
            className="mr-12"
            src="https://randomuser.me/api/portraits/women/87.jpg"
          />
          <div className="flex-1 overflow-hidden">
            <div
              className="text-subheader text-truncate"
              title="Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr."
            >
              Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr.
            </div>
            <div
              className="text-caption text-color-gray text-truncate"
              title="hubert_blaine_wolfeschlegelsteinhausenbergerdorff_sr_2021@gmail.com"
            >
              hubert_blaine_wolfeschlegelsteinhausenbergerdorff_sr_2021@gmail.com
            </div>
          </div>
        </div>
        <a href="" className="main-dropdown__item">
          Account
        </a>
        <a href="" className="main-dropdown__item">
          Trips
        </a>
        <a href="" className="main-dropdown__item">
          Favorites
        </a>
        <a href="" className="main-dropdown__item">
          Help & FAQ
        </a>
        <a href="" className="main-dropdown__item in-blue-1000 main-link">
          List Your Camper
        </a>
        <a href="" className="main-dropdown__item in-gray-500">
          <i className="icon icon-log-out in-gray-700 mr-8" />
          Log Out
        </a>
      </div>
    </div>
  </Dropdown>
);

export default UserDropdown;
