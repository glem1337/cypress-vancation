import PropTypes from 'prop-types';

import UserFooter from 'views/shared/UserFooter';

const Footer = ({ innerRef }) => (
  <div ref={innerRef} id="footer-wrapper">
    <UserFooter />
  </div>
);

Footer.propTypes = {
  innerRef: PropTypes.func.isRequired,
};

export default Footer;
