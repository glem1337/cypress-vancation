import classNames from 'classnames';
import PropTypes from 'prop-types';

const ActionButton = (props) => {
  const {
    extraClasses,
    secondary,
    disabled,
    onClick,
    icon,
  } = props;
  const btnClassNames = classNames(extraClasses, {
    'action-btn': true,
    'action-btn--secondary': secondary,
  });

  return (
    <button
      type="button"
      className={btnClassNames}
      disabled={disabled}
      onClick={onClick}
    >
      <i className={classNames('icon', icon)} />
    </button>
  );
};

ActionButton.defaultProps = {
  extraClasses: '',
  secondary: false,
  disabled: false,
  onClick: null,
};

ActionButton.propTypes = {
  extraClasses: PropTypes.string,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.string.isRequired,
};

export default ActionButton;
