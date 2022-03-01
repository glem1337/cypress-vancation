import { Button } from 'antd';
import PropTypes from 'prop-types';

const StickyHelpButton = ({ icon, className }) => (
  <Button
    className={`main-help-btn-fixed border-none ${className}`}
    shape="circle"
    icon={<i className={`icon ${icon} in-blue-1000`} />}
  />
);

StickyHelpButton.defaultProps = {
  icon: 'icon-question-f',
  className: '',
};

StickyHelpButton.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
};

export default StickyHelpButton;
