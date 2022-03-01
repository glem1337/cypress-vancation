/* eslint-disable react/prop-types */
import React from 'react';
import { Divider } from 'antd';

const MenuMob = ({ visible, menuToggle }) => (
  <aside
    className={`main-account-menu ${visible && 'main-account-menu--open'}`}
  >
    <div className="main-account-header">
      <button
        className="main-account-header-burger"
        type="button"
        onClick={menuToggle}
      >
        <i className="icon icon-cross" />
      </button>
      <img src="/images/logo/logo-colored.svg" alt="" />
    </div>
    <div className="main-account-menu__item mt-8">
      <a href="#" className="main-account-menu__item-txt">
        Sign Up
      </a>
    </div>
    <div className="main-account-menu__item">
      <a href="#" className="main-account-menu__item-txt">
        Log In
      </a>
    </div>
    <div className="main-account-menu__item">
      <a href="#" className="main-account-menu__item-txt in-blue-1000">
        List Your Camper
      </a>
    </div>
    <Divider className="mb-8" />
    <div className="main-account-menu__item">
      <span className="main-account-menu__item-txt">Destinations</span>
      <i className="icon icon-right in-black font-16 ml-auto ml-md-0" />
    </div>
    <div className="main-account-menu__item">
      <span className="main-account-menu__item-txt">Help Center</span>
      <i className="icon icon-right in-black font-16 ml-auto ml-md-0" />
    </div>
  </aside>
);

export default MenuMob;
