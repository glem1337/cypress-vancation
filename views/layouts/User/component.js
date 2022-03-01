import PropTypes from 'prop-types';
import classNames from 'classnames';

import UserHeader from '../headers/UserHeader';
import UserSidebar from '../sidebars/UserSidebar';

const UserLayoutComponent = ({
  children,
  isSidebarVisible,
  onSidebarToggle,
  isGray,
  currentUser,
  wrapClassName,
}) => (
  <div className="app-wrap">
    <UserHeader onSidebarToggle={onSidebarToggle} currentUser={currentUser} />
    <div className="app-wrap__content">
      <div className="app-wrap__sidebar">
        <aside className={`sidebar ${isSidebarVisible ? 'sidebar--visible' : ''}`}>
          <div className="main-separator d-lg-none" />
          <UserSidebar />
        </aside>
      </div>
      <div className={classNames('app-wrap__main', wrapClassName)}>
        <div
          className={`app-wrap__viewport ${isGray ? 'app-wrap__viewport--gray' : ''}`}
          data-scroll="main"
        >
          {children}
        </div>
      </div>
    </div>
    <div
      className={`sidebar-backdrop d-lg-none ${isSidebarVisible ? 'sidebar-backdrop--visible' : ''}`}
      onClick={onSidebarToggle}
      role="button"
    />
  </div>
);

UserLayoutComponent.defaultProps = {
  wrapClassName: null,
  currentUser: null,
  isGray: false,
};

UserLayoutComponent.propTypes = {
  children: PropTypes.node.isRequired,
  isSidebarVisible: PropTypes.bool.isRequired,
  onSidebarToggle: PropTypes.func.isRequired,
  isGray: PropTypes.bool,
  currentUser: PropTypes.shape(),
  wrapClassName: PropTypes.string,
};

export default UserLayoutComponent;
