/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Badge } from 'antd';

import Logo from 'views/stubs/shared/Logo';
import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import ActionBtnGradient from 'views/stubs/shared/buttons/ActionBtnGradient';
import UserDropdown from './UserDropdown';
import SearchInput from './SearchInput';
import MenuMob from './MenuMob';
import Dropdown from '../../../shared/dropdowns/Dropdown';
import DestinationPopover from './DestinationPopover';

const Header = ({ unlogged }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuToggle = () => setMenuOpen(prev => !prev);

  return (
    <header id="main-account-header" className="main-account-header">
      <button
        className="main-account-header-burger"
        type="button"
        onClick={() => setMenuOpen(true)}
      >
        <i className="icon icon-menu" />
      </button>
      <a href="/" className="d-md-none mr-16">
        <img src="/images/logo/logo-hand.svg" alt="" />
      </a>
      <a href="/" className="d-none d-md-block">
        <Logo bigLogoClassName="mr-24" smallLogoClassName="mr-16" />
      </a>
      <div className="d-flex align-items-center">
        <SearchInput />
        <ActionBtnGradient
          icon={<i className="icon icon-search" />}
          className="d-none d-md-inline-block"
          size="large"
        />
      </div>
      {unlogged ? (
        <>
          <Dropdown
            placement="bottomRight"
            icon={(
              <div className="main-account-header__item ml-auto">
                <span className="mr-4 main-account-header__item-txt">
                  Destinations
                </span>
                <i className="icon icon-down in-black font-16" />
              </div>
            )}
            overlayClassName="main-account-header__destination"
            getPopupContainer={() => document.getElementById('main-account-header')}
          >
            <div className="main-dropdown-wrap main-account-header__destination-popopver">
              <div className="main-dropdown__body">
                <DestinationPopover />
              </div>
            </div>
          </Dropdown>
          <div className="main-account-header__item">
            <span className="mr-4 main-account-header__item-txt">
              Help Center
            </span>
            <i className="icon icon-down in-black font-16" />
          </div>
          <div className="main-account-header__item">
            <span className="mr-4 main-account-header__item-txt">Sign Up</span>
          </div>
          <div className="main-account-header__item">
            <span className="mr-4 main-account-header__item-txt">Log In</span>
          </div>
          <div className="main-account-header__item mr-0">
            <MainBtnGradient text="List Your Camper" />
          </div>
        </>
      ) : (
        <>
          <div className="main-account-header__item ml-auto">
            <span className="mr-4 main-account-header__item-txt">
              Destinations
            </span>
            <i className="icon icon-down in-black font-16" />
          </div>
          <div className="main-account-header__item ">
            <span className="main-account-header__item-txt">Messages</span>
            <span className="main-account-header__item-counter">2</span>
          </div>
          <Badge dot className="d-none d-lg-flex">
            <i className="icon icon-notification-f in-black font-20" />
          </Badge>
          <UserDropdown />
        </>
      )}
      <MenuMob visible={isMenuOpen} menuToggle={menuToggle} />
    </header>
  );
};

export default Header;
