import PropTypes from 'prop-types';
import classNames from 'classnames';
import FormattedOrRawMessage from 'views/shared/FormattedOrRawMessage';

const InputMessage = ({
  icon, message,
}) => {
  const iconClassNames = classNames(
    'main-input__message-icon icon',
    {
      'icon-close': icon === 'close',
      'icon-alert': icon === 'alert',
      'icon-info': icon === 'info',
      'icon-tick': icon === 'tick',
    },
  );

  return (
    <p className="main-input__message">
      <i className={iconClassNames} />
      <FormattedOrRawMessage message={message} />
    </p>
  );
};

InputMessage.defaultProps = {
  icon: null,
};

InputMessage.propTypes = {
  icon: PropTypes.oneOf(['close', 'alert', 'info', 'tick', null]),
  message: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      values: PropTypes.shape(),
    }),
    PropTypes.string,
  ]).isRequired,
};

export default InputMessage;
