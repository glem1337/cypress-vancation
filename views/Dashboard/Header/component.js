import { Badge } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import classNames from 'classnames';
import ROUTES from 'constants/routes';
import UserDropdown from './UserDropdown';
import ActionDropdownCampers from './DropdownCampers';
import Tabs from './Tabs';
import MobileMenu from './MobileMenu';

const HeaderComponent = ({
  signOut,
  currentUser,
  activeTabKey,
  isMobileMenuVisible,
  setMobileMenuVisibility,
  ownerCampersPagination: { total },
}) => (
  <header className="main-account-header main-account-header--listing">
    <div className="d-flex align-items-center">
      <button
        className="main-account-header-burger"
        type="button"
        onClick={setMobileMenuVisibility(true)}
      >
        <i className="icon icon-menu" />
      </button>
      <a href={ROUTES.INDEX.PATH} target="_blank" rel="noreferrer">
        <img src="/images/logo/logo-circle.svg" alt="" />
      </a>
      <div className="main-account-header__title">
        <FormattedMessage id="shared.ownerDashboard" />
      </div>
      {total > 0 && <ActionDropdownCampers />}
      <div
        className={classNames('main-account-header-notif--listing', {
          'ml-auto': total === 0,
          'ml-lg-40': total > 0,
        })}
      >
        <Badge dot>
          <i className="icon icon-notification-f in-black font-20" />
        </Badge>
      </div>
      <UserDropdown
        signOut={signOut}
        currentUser={currentUser}
      />
    </div>
    <Tabs activeKey={activeTabKey} />
    <MobileMenu
      isCampersListVisible={total > 0}
      isVisible={isMobileMenuVisible}
      closeMobileMenu={setMobileMenuVisibility(false)}
      activeKey={activeTabKey}
      currentUser={currentUser}
      signOut={signOut}
    />
  </header>
);

HeaderComponent.propTypes = {
  signOut: PropTypes.func.isRequired,
  currentUser: PropTypes.shape(),
  activeTabKey: PropTypes.string.isRequired,
  isMobileMenuVisible: PropTypes.bool.isRequired,
  setMobileMenuVisibility: PropTypes.func.isRequired,
  ownerCampersPagination: PropTypes.shape().isRequired,
};

HeaderComponent.defaultProps = {
  currentUser: null,
};

export default HeaderComponent;
