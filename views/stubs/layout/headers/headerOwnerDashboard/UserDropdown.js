import {
  Avatar,
} from 'antd';
import Dropdown from 'views/stubs/shared/dropdowns/Dropdown';

const UserDropdown = () => (
  <Dropdown
    icon={(
      <Avatar
        className="d-none d-lg-block c-pointer"
        src="https://randomuser.me/api/portraits/women/87.jpg"
      />
    )}
    placement="bottomRight"
  >
    <div className="main-dropdown-wrap">
      <div className="main-dropdown__body">
        <div className="main-dropdown__item pt-8 pb-16">
          <Avatar
            size="large"
            className="mr-12"
            src="https://randomuser.me/api/portraits/women/87.jpg"
          />
          <div>
            <div className="text-subheader ">
              Rodney Harmon
            </div>
            <div className="text-caption text-color-gray">
              rodney.harmon@gmail.com
            </div>
          </div>
        </div>
        <a href="" className="main-dropdown__item in-blue-1000">
          List Your Camper
        </a>
        <a href="" className="main-dropdown__item">
          Help & FAQ
        </a>
        <a href="" className="main-dropdown__item">
          View Business Profile
        </a>
        <a href="" className="main-dropdown__item">
          Notifications Settings
        </a>
        <a href="" className="main-dropdown__item">
          Payout Preferences
        </a>
        <a href="" className="main-dropdown__item in-gray-700">
          <i className="icon icon-log-out in-gray-700 mr-8" />
          Log Out
        </a>
      </div>
    </div>
  </Dropdown>
);

export default UserDropdown;
