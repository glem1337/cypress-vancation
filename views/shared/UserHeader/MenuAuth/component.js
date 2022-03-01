import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Divider } from 'antd';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { pathOr } from 'ramda';
import Link from 'next/link';

import { HEADER_USER_ITEMS } from 'constants/headers';
import userInitials from 'utils/userInitials';
import ROUTES from 'constants/routes';
import isPresent from 'utils/isPresent';
import Logo from 'views/shared/Logo';

import UserHeaderMenuItem from './UserHeaderMenuItem';

const UserHeaderMenuMobile = ({
  onClose,
  visible,
  currentUser,
  active,
  handlerSignOut,
  showOwnersDashboardBtn,
}) => {
  if (!isPresent(currentUser)) {
    return null;
  }

  const email = pathOr('', ['email'], currentUser);
  const { firstName, lastName, avatarUrl } = pathOr({ firstName: '', lastName: '', avatarUrl: null }, ['user'], currentUser);

  return (
    <aside className={classNames('main-account-menu', visible && 'main-account-menu--open')}>
      <div className="main-account-header">
        <button
          className="main-account-header-burger"
          type="button"
          onClick={onClose}
        >
          <i className="icon icon-cross" />
        </button>
        <div className="d-lg-none mr-16">
          <Logo
            bigLogoClassName="d-xxs-block"
            smallLogoClassName="d-none"
            isLink
          />
        </div>
      </div>
      <div className="main-account-menu__user">
        <Avatar
          className="mr-12"
          src={avatarUrl}
        >
          {userInitials(firstName, lastName)}
        </Avatar>
        <div className="flex-1 overflow-hidden">
          <div className="main-account-menu__user-name text-truncate">
            {`${firstName} ${lastName}`}
          </div>
          <div className="main-account-menu__user-email text-truncate">
            {email}
          </div>
        </div>
      </div>
      <Divider className="mb-8" />
      <div>
        {showOwnersDashboardBtn && (
          <Link href={ROUTES.OWNER_DASHBOARD.ALL_CAMPERS.PATH}>
            <div className="main-account-menu__item">
              <span className="main-account-menu__item-txt">
                <FormattedMessage id="shared.ownerDashboard" />
              </span>
            </div>
          </Link>
        )}
        <div className="main-account-menu__item">
          <span className="main-account-menu__item-txt">
            <FormattedMessage id="headerHeader.destinations" />
          </span>
          <i className="icon icon-right in-black font-16 ml-auto ml-md-0" />
        </div>
        <Link href={ROUTES.BOOKINGS.PATH}>
          <div className="main-account-menu__item">
            <span className="main-account-menu__item-txt">
              <FormattedMessage id="headerHeader.messages" />
            </span>
            <span className="main-account-header__item-counter">
              2
            </span>
          </div>
        </Link>
        <div className="main-account-menu__item">
          <span className="main-account-menu__item-txt">
            <FormattedMessage id="headerHeader.notifications" />
          </span>
          <span className="main-account-header__item-counter">
            2
          </span>
        </div>
      </div>
      <Divider className="mb-8" />
      <div className="d-flex flex-column flex-grow-1">
        {
          HEADER_USER_ITEMS.map(elem => (
            <UserHeaderMenuItem
              {...elem}
              itMenu
              keyPage={elem.key}
              active={active}
              targetBlankItems={[ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.KEY]}
            />
          ))
        }
      </div>
      <button onClick={handlerSignOut} type="button" className="main-dropdown__item in-gray-700">
        <i className="icon icon-log-out in-gray-700 mr-8" />
        <FormattedMessage id="headerHeader.logout" />
      </button>
    </aside>
  );
};

UserHeaderMenuMobile.defaultProps = {
  currentUser: null,
  active: '',
};

UserHeaderMenuMobile.propTypes = {
  showOwnersDashboardBtn: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handlerSignOut: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  active: PropTypes.string,
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    user: PropTypes.shape({
      lastName: PropTypes.string,
      firstName: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
  }),
};

export default UserHeaderMenuMobile;
