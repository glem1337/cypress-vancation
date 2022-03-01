import PropTypes from 'prop-types';
import { Button } from 'antd';

const BackBtn = ({ text, className }) => {
  const classes = `main-btn-simple ${className}`;

  return (
    <a href="" className={classes}>
      <Button
        className="p-0"
        type="link"
        icon={(<i className="icon icon-left-edge in-gray-700" />)}
      >
        {text}
      </Button>
    </a>
  );
};

BackBtn.defaultProps = {
  className: '',
};

BackBtn.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default BackBtn;
