import PropTypes from 'prop-types';
import classNames from 'classnames';

import WelcomeSidebar from '../sidebars/WelcomeSidebar';
import GuestHeader from '../headers/GuestHeader';

const AuthLayout = ({ children, className, withSidebar }) => (
  <div className={classNames('main-wrap', className)}>
    {withSidebar ? (
      <>
        <WelcomeSidebar />
        <div className="auth-main">
          <div className="auth-main__container">{children}</div>
        </div>
      </>
    ) : (
      <div className="auth-main justify-content-flex-start flex-column">
        <GuestHeader />
        {children}
      </div>
    )}
  </div>
);

AuthLayout.defaultProps = {
  className: null,
  withSidebar: false,
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  withSidebar: PropTypes.bool,
};

export default AuthLayout;
