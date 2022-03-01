import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';

import ROUTES from 'constants/routes';

import Logo from 'views/shared/Logo';
import BtnGradient from 'views/shared/BtnGradient';

import HelpCenterSection from './HelpCenterSection';
import AccountDropdown from './AccountDropdown';
import MessagesSection from './MessagesSection';
import ListYouCamperButton from './ListYouCamperButton';
import LinksSection from './LinksSection';
import MenuNotAuth from './MenuNotAuth';
import MenuAuth from './MenuAuth';
import DestinationsSection from './DestinationsSection';
import MobileHeaderExpanded from './MobileHeaderExpanded';
import GroupedMenu from './GroupedMenu';

const UserHeaderComponent = ({
  isAccountDropdownVisible,
  onAccountDropdownToggle,
  currentUser,
  isMobileMenuVisible,
  onMobileMenuOpen,
  onMobileMenuClose,
  handlerSignOut,
  active,
  isUserLoggedIn,
  SearchSection,
  isMobileHeaderExpanded,
  areItemsGrouped,
  headerClassNames,
  ownerProfile,
}) => {
  if (isMobileHeaderExpanded) {
    return (<MobileHeaderExpanded />);
  }

  return (
    <header
      className={classNames(
        'main-home-header',
        'main-account-header-extended',
        headerClassNames && headerClassNames,
      )}
    >
      <button
        className="main-account-header-burger"
        type="button"
        onClick={onMobileMenuOpen}
      >
        <i className="icon icon-menu" />
      </button>
      <div className="flex-shrink-0">
        <Logo
          bigLogoClassName="mr-24"
          smallLogoClassName="mr-16"
          isLink
        />
      </div>
      {SearchSection || <div className="flex-1" />}
      {(ownerProfile.campersCount > 0 && !areItemsGrouped) && (
        <Link href={ROUTES.OWNER_DASHBOARD.ALL_CAMPERS.PATH}>
          <a>
            <BtnGradient
              className="mr-40 d-none d-lg-block"
              text={{
                id: 'shared.ownerDashboard',
              }}
            />
          </a>
        </Link>
      )}
      <DestinationsSection isVisible={!areItemsGrouped} />
      <HelpCenterSection isVisible={!areItemsGrouped} />
      <LinksSection isVisible={!isUserLoggedIn && !areItemsGrouped} />
      <MessagesSection isVisible={isUserLoggedIn && !areItemsGrouped} />
      {areItemsGrouped && <GroupedMenu showOwnersDashboard={ownerProfile.campersCount > 0} />}
      <ListYouCamperButton isVisible={!isUserLoggedIn} />
      <AccountDropdown
        currentUser={currentUser}
        visible={isAccountDropdownVisible}
        onVisibleChange={onAccountDropdownToggle}
        handlerSignOut={handlerSignOut}
        active={active}
      />
      <MenuNotAuth
        currentUser={currentUser}
        onClose={onMobileMenuClose}
        visible={isMobileMenuVisible}
        menuToggle={onMobileMenuClose}
      />
      <MenuAuth
        currentUser={currentUser}
        onClose={onMobileMenuClose}
        visible={isMobileMenuVisible}
        handlerSignOut={handlerSignOut}
        active={active}
        showOwnersDashboardBtn={ownerProfile.campersCount > 0}
      />
    </header>
  );
};

UserHeaderComponent.defaultProps = {
  currentUser: null,
  active: undefined,
  SearchSection: null,
  headerClassNames: null,
  ownerProfile: {
    campersCount: 0,
  },
};

UserHeaderComponent.propTypes = {
  isAccountDropdownVisible: PropTypes.bool.isRequired,
  isMobileMenuVisible: PropTypes.bool.isRequired,
  onAccountDropdownToggle: PropTypes.func.isRequired,
  onMobileMenuOpen: PropTypes.func.isRequired,
  onMobileMenuClose: PropTypes.func.isRequired,
  handlerSignOut: PropTypes.func.isRequired,
  active: PropTypes.string,
  currentUser: PropTypes.shape(),
  isUserLoggedIn: PropTypes.bool.isRequired,
  SearchSection: PropTypes.node,
  isMobileHeaderExpanded: PropTypes.bool.isRequired,
  areItemsGrouped: PropTypes.bool.isRequired,
  headerClassNames: PropTypes.string,
  ownerProfile: PropTypes.shape(),
};

export default UserHeaderComponent;
