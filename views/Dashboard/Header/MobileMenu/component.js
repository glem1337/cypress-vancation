import React from 'react';
import classNames from 'classnames';
import { Avatar, Divider } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import { pathOr } from 'ramda';

import { USER_DROPDOWN_ITEMS, DASHBOARD_TABS } from 'constants/dashboard';
import ROUTES from 'constants/routes';

import userInitials from 'utils/userInitials';
import isPresent from 'utils/isPresent';

import DropdownCampers from '../DropdownCampers';

const MobileMenu = ({
  isVisible,
  closeMobileMenu,
  signOut,
  activeKey,
  currentUser,
  isCampersListVisible,
  camperId,
  hideItem,
}) => {
  const email = pathOr('', ['email'], currentUser);
  const firstName = pathOr('', ['user', 'firstName'], currentUser);
  const lastName = pathOr('', ['user', 'lastName'], currentUser);
  const avatarUrl = pathOr('', ['user', 'avatarUrl'], currentUser);

  return (
    <aside className={classNames('main-account-menu', isVisible && 'main-account-menu--open')}>
      <div className="main-account-header">
        <button
          className="main-account-header-burger"
          onClick={closeMobileMenu}
          type="button"
        >
          <i className="icon icon-cross" />
        </button>
        <div>
          <a href={ROUTES.INDEX.PATH} target="_blank" rel="noreferrer">
            <img src="/images/logo/logo-circle.svg" alt="" />
          </a>
        </div>
        <div className="main-account-header__title">
          <FormattedMessage id="shared.ownerDashboard" />
        </div>
      </div>
      {isCampersListVisible && <DropdownCampers isMobileMode />}
      <div className="master-view-menu-button-after" />
      <div>
        {Object.keys(DASHBOARD_TABS).map(key => {
          const item = DASHBOARD_TABS[key];

          const href = {
            pathname: item.route,
          };

          if (isPresent(camperId)) {
            href.query = { camper: camperId };
          }

          return (
            <Link key={key} href={href}>
              <li className={classNames('main-account-menu__item', {
                'd-none': key === hideItem,
              })}
              >
                <span
                  className={classNames('main-account-menu__item-txt', {
                    'in-blue-1000': key === activeKey,
                  })}
                >
                  <FormattedMessage id={item.id} />
                </span>
                {item.count && (
                <span className="main-account-header__item-counter">{item.count}</span>
              )}
              </li>
            </Link>
          );
        })}
      </div>
      <Divider className="mb-8" />
      <div className="main-account-menu__user">
        <Avatar
          className="mr-12"
          src={avatarUrl}
        >
          {userInitials(firstName, lastName)}
        </Avatar>
        <div>
          <div className="main-account-menu__user-name">
            {`${firstName} ${lastName}`}
          </div>
          <div className="main-account-menu__user-email">
            {email}
          </div>
        </div>
      </div>
      <Divider className="mb-8" />
      <div className="d-flex flex-column flex-grow-1">
        {USER_DROPDOWN_ITEMS.map(elem => {
          const Wrapper = elem.route
            ? Link
            : React.Fragment;

          const wrapperProps = elem.route
            ? { href: elem.route }
            : undefined;

          return (
            <Wrapper {...wrapperProps} key={elem.id}>
              <a
                target="_blank"
                rel="noreferer"
                className={classNames('main-dropdown__item', {
                'in-blue-1000': elem.selected,
                'text-color-gray': !elem.selected,
              })}
              >
                <FormattedMessage id={elem.id} />
              </a>
            </Wrapper>
          );
        })}
        <button onClick={signOut} type="button" className="main-dropdown__item in-gray-700">
          <i className="icon icon-log-out in-gray-500 mr-8" />
          <FormattedMessage id="headerHeader.logout" />
        </button>
      </div>
    </aside>
  );
};

MobileMenu.propTypes = {
  isCampersListVisible: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  closeMobileMenu: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  activeKey: PropTypes.string.isRequired,
  hideItem: PropTypes.string.isRequired,
  currentUser: PropTypes.shape(),
  camperId: PropTypes.string,
};

MobileMenu.defaultProps = {
  currentUser: null,
  camperId: null,
};

export default MobileMenu;
