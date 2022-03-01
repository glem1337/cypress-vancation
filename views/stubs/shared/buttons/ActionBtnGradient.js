import { Button } from 'antd';
import PropTypes from 'prop-types';

const ActionBtnGradient = ({ className, ...rest }) => (
  <Button {...rest} className={`main-btn--gradient ant-btn-icon-only ${className}`}>
    <span className="main-btn__gradient-inner" />
  </Button>
);

ActionBtnGradient.defaultProps = {
  className: '',
};

ActionBtnGradient.propTypes = {
  className: PropTypes.string,
};

export default ActionBtnGradient;
