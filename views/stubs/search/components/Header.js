/* eslint-disable react/prop-types */
import { useState } from 'react';

import Logo from 'views/stubs/shared/Logo';
import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import ActionBtnGradient from '../../shared/buttons/ActionBtnGradient';
import SearchInput from './SearchInput';
import MenuMob from './MenuMob';
import SearchModal from './SearchModal';

const Header = ({ filtersMobToggle }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuToggle = () => setMenuOpen((prev) => !prev);
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
      <div className="main-account-header__item">
        <span className="mr-4 main-account-header__item-txt">Help Center</span>
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
      <MenuMob visible={isMenuOpen} menuToggle={menuToggle} />
      <SearchModal visible={modalVisible} modalToggle={modalToggle} />
    </header>
  );
};

export default Header;
