import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import classNames from 'classnames';
import MainBtnGradient from '../../../shared/buttons/MainBtnGradient';
import Logo from '../../../shared/Logo';
import ActionBtnGradient from '../../../shared/buttons/ActionBtnGradient';
import HeaderHomeSearch from './HeaderHomeSearch';

//  TODO: Add class 'main-home-header--scrolled' when page below search
const Header = ({ scrolled }) => (
  <header className={classNames('main-home-header', { 'main-home-header--scrolled': scrolled })}>
    <button
      className="main-account-header-burger"
      type="button"
    >
      <i className="icon icon-menu" />
    </button>
    {scrolled ? (
      <div className="flex-shrink-0">
        <Logo bigLogoClassName="mr-24" smallLogoClassName="mr-16" />
      </div>
      ) : (
        <div className="mr-16 flex-shrink-0">
          <img src="/images/logo/logo-colored.svg" alt="" />
        </div>
      )}
    <Input
      className="main-home-location__input d-md-none"
      allowClear
      prefix={<i className="icon icon-search in-gray-500" />}
      placeholder="Where are you going?"
    />
    {/* TODO: switch this class 'main-home-location__gap--open'
          when input is clicked or unfocused
      */}
    <div className="main-home-location__gap main-home-location__gap--open">
      <Input
        className="main-home-location__input"
        prefix={<i className="icon icon-search in-gray-500" />}
        placeholder="Start your search?"
      />
      <ActionBtnGradient
        className="main-home-location__gap-btn"
        size="small"
        shape="circle"
        icon={<i className="icon icon-search font-20" />}
      />
      <HeaderHomeSearch />
    </div>
    <div className="main-account-header__item ml-auto main-home-header__scroll-hidden">
      <span className="mr-4 main-account-header__item-txt">Destinations</span>
      <i className="icon icon-down in-black font-16" />
    </div>
    <div className="main-account-header__item main-home-header__scroll-hidden">
      <span className="mr-4 main-account-header__item-txt">Help Center</span>
      <i className="icon icon-down in-black font-16" />
    </div>
    <div className="main-account-header__item">
      <span className="main-account-header__item-txt">Sign Up</span>
    </div>
    <div className="main-account-header__item">
      <span className="main-account-header__item-txt">Log In</span>
    </div>
    <MainBtnGradient
      className="d-none d-lg-inline-block"
      text="List Your Camper"
    />
  </header>
  );

Header.defaultProps = {
  scrolled: false,
};

Header.propTypes = {
  scrolled: PropTypes.bool,
};

export default Header;
