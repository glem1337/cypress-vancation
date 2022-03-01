import { Menu } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

import ROUTES from 'constants/routes';

const MenuContent = ({ isUserLoggedIn, showOwnersDashboard }) => (
  <Menu>
    {showOwnersDashboard && (
      <Menu.Item key="shared.ownerDashboard">
        <Link href={ROUTES.OWNER_DASHBOARD.ALL_CAMPERS.PATH}>
          <div className="main-account-header__grouped-menu-item">
            <span className="main-account-header__item-txt">
              <FormattedMessage id="shared.ownerDashboard" />
            </span>
          </div>
        </Link>
      </Menu.Item>
    )}
    <Menu.Item key="headerHeader.destinations">
      <div className="main-account-header__grouped-menu-item">
        <span className="main-account-header__item-txt">
          <FormattedMessage id="headerHeader.destinations" />
        </span>
      </div>
    </Menu.Item>
    <Menu.Item key="userHeader.helpCenter">
      <div className="main-account-header__grouped-menu-item">
        <span className="main-account-header__item-txt">
          <FormattedMessage id="userHeader.helpCenter" />
        </span>
      </div>
    </Menu.Item>
    {!isUserLoggedIn && (
      <Menu.Item key="shared.signUp">
        <Link href={ROUTES.SIGNUP.PATH}>
          <div className="main-account-header__grouped-menu-item">
            <span className="main-account-header__item-txt">
              <FormattedMessage id="shared.signUp" />
            </span>
          </div>
        </Link>

      </Menu.Item>
    )}
    {!isUserLoggedIn && (
      <Menu.Item key="shared.logIn">
        <Link href={ROUTES.LOGIN.PATH}>
          <div className="main-account-header__grouped-menu-item">
            <span className="main-account-header__item-txt">
              <FormattedMessage id="shared.logIn" />
            </span>
          </div>
        </Link>
      </Menu.Item>
    )}
    {isUserLoggedIn && (
      <Menu.Item key="headerHeader.messages">
        <div className="main-account-header__grouped-menu-item">
          <span className="main-account-header__item-txt">
            <FormattedMessage id="headerHeader.messages" />
          </span>
        </div>
      </Menu.Item>
    )}
  </Menu>
);

MenuContent.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  showOwnersDashboard: PropTypes.bool.isRequired,
};

export default MenuContent;
