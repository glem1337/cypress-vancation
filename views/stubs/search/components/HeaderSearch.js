/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Badge } from 'antd';

import Logo from 'views/stubs/shared/Logo';
import ActionBtnGradient from '../../shared/buttons/ActionBtnGradient';
import UserDropdown from '../../layout/headers/mainHeader/UserDropdown';
import MenuMob from '../../layout/headers/mainHeader/MenuMob';
import SearchInput from './SearchInput';
import SearchModal from './SearchModal';

const HeaderSearch = ({ filtersMobToggle }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuToggle = () => setMenuOpen(!isMenuOpen);
  const [modalVisible, setModalVisible] = useState(false);
  const modalToggle = () => setModalVisible((prev) => !prev);

  return (
    <header className="main-account-header">
      <button
        className="main-account-header-burger"
        type="button"
        onClick={menuToggle}
      >
        <i className="icon icon-menu" />
      </button>
      <div className="d-md-none flex-none mr-16">
        <img src="/images/logo/logo-hand.svg" alt="" />
      </div>
      <div className="d-none d-md-block">
        <Logo bigLogoClassName="mr-24" smallLogoClassName="mr-16" />
      </div>
      <div className="main-account-header-search-filter">
        <SearchInput
          filtersMobToggle={filtersMobToggle}
          modalToggle={modalToggle}
        />
        <ActionBtnGradient
          icon={<i className="icon icon-search" />}
          className="d-none d-md-inline-block"
          size="large"
        />
      </div>
      <div className="main-account-header__item ml-auto">
        <span className="mr-4 main-account-header__item-txt">Destinations</span>
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
      <MenuMob visible={isMenuOpen} menuToggle={menuToggle} />
      <SearchModal visible={modalVisible} modalToggle={modalToggle} />
    </header>
  );
};

export default HeaderSearch;
