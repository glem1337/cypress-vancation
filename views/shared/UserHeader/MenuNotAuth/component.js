import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import isPresent from 'utils/isPresent';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

import Logo from 'views/shared/Logo';
import ROUTES from 'constants/routes';
import { createRouteFromPathname } from 'utils/createRouteHelper';

const UserHeaderMenuMobile = ({
  visible,
  currentUser,
  menuToggle,
}) => {
  if (isPresent(currentUser)) {
    return null;
  }

  return (
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
        <Logo
          bigLogoClassName="d-xxs-block"
          smallLogoClassName="d-none"
          isLink
        />
      </div>
      <div className="main-account-menu__item mt-8">
        <Link href={ROUTES.SIGNUP.PATH}>
          <a href="#" className="main-account-menu__item-txt">
            <FormattedMessage id="shared.signUp" />
          </a>
        </Link>
      </div>
      <div className="main-account-menu__item">
        <Link href={ROUTES.LOGIN.PATH}>
          <a href="#" className="main-account-menu__item-txt">
            <FormattedMessage id="shared.logIn" />
          </a>
        </Link>
      </div>
      <div className="main-account-menu__item">
        <Link href={createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH, 'id')}>
          <a className="main-account-menu__item-txt in-blue-1000">
            <FormattedMessage id="shared.listYourCamper" />
          </a>
        </Link>
      </div>
      <Divider className="mb-8" />
      <div className="main-account-menu__item">
        <span className="main-account-menu__item-txt">
          <FormattedMessage id="headerHeader.destinations" />
        </span>
        <i className="icon icon-right in-black font-16 ml-auto ml-md-0" />
      </div>
      <div className="main-account-menu__item">
        <span className="main-account-menu__item-txt">
          <FormattedMessage id="userHeader.helpCenter" />
        </span>
        <i className="icon icon-right in-black font-16 ml-auto ml-md-0" />
      </div>
    </aside>
  );
};

UserHeaderMenuMobile.defaultProps = {
  currentUser: null,
};

UserHeaderMenuMobile.propTypes = {
  visible: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({}),
  menuToggle: PropTypes.func.isRequired,
};

export default UserHeaderMenuMobile;
