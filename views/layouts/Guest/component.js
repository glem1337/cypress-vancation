import PropTypes from 'prop-types';

import GuestHeader from '../headers/GuestHeader';

// TODO: add authorize
const GuestLayout = ({ children }) => (
  <div className="main-wrap">
    <div className="auth-main justify-content-flex-start flex-column">
      <GuestHeader />
      {children}
    </div>
  </div>
);

GuestLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GuestLayout;
