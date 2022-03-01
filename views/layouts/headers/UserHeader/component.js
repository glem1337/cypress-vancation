import PropTypes from 'prop-types';

import Avatar from 'views/shared/Avatar';
import Dropdown from 'views/shared/Dropdown';

const UserHeaderComponent = ({
  isAccountWidgetVisible, onAccountWidgetToggle, onSidebarToggle, currentUser,
}) => (
  <header className="main-header">
    <button className="main-header__menu-switcher" type="button" onClick={onSidebarToggle}>
      <i className="icon icon-menu relative" />
    </button>
    <a className="main-header__logo" href="/">
      <img src="/images/logo/logo.png" alt="" />
    </a>
    <div className="d-flex">
      <button className="main-header__notifications" type="button">
        <i className="icon icon-notification-o" />
      </button>
      <Dropdown
        visible={isAccountWidgetVisible}
        onVisibleChange={onAccountWidgetToggle}
        icon={(
          <button className="main-header__account" type="button">
            {currentUser && (
              <Avatar
                avatarClassName="main-header__account-image"
                sizeClassName="main-userpic--sm"
                user={currentUser}
              />
            )}
            {
              isAccountWidgetVisible
                ? <i className="icon icon-arrow-up relative" />
                : <i className="icon icon-arrow-down relative" />
            }
          </button>
        )}
      >
        Account data
      </Dropdown>
    </div>
  </header>
);

UserHeaderComponent.defaultProps = {
  currentUser: null,
};

UserHeaderComponent.propTypes = {
  isAccountWidgetVisible: PropTypes.bool.isRequired,
  onAccountWidgetToggle: PropTypes.func.isRequired,
  onSidebarToggle: PropTypes.func.isRequired,
  currentUser: PropTypes.shape(),
};

export default UserHeaderComponent;
