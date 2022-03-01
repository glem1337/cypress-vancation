import { Button } from 'antd';
import PropTypes from 'prop-types';

const MainBtnGradient = ({ text, className, ...rest }) => {
  const classes = `main-btn--gradient ${className}`;

  return (
    <Button {...rest} className={classes}>
      {text}
      <span className="main-btn__gradient-inner" />
    </Button>
  );
};

MainBtnGradient.defaultProps = {
  className: '',
};

MainBtnGradient.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default MainBtnGradient;
