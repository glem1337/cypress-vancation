import PropTypes from 'prop-types';
import { Button } from 'antd';

const BackBtn = ({ text, className, onClick }) => {
  const classes = `main-btn-simple ${className}`;

  return (
    <span className={classes}>
      <Button
        className="p-0"
        type="link"
        icon={(<i className="icon icon-left-edge in-gray-700" />)}
        onClick={onClick}
      >
        <span>{text}</span>
      </Button>
    </span>
  );
};

BackBtn.defaultProps = {
  className: '',
  onClick: undefined,
};

BackBtn.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default BackBtn;
