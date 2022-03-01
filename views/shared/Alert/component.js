import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ALERT_KINDS } from 'constants';
import FormattedOrRawMessage from '../FormattedOrRawMessage';

const Alert = ({
  className,
  type,
  hasNoIcon,
  message,
  isDiscardable,
  onDiscard,
}) => {
  const alertClassNames = classNames(
    className,
    'main-alert',
    {
      'main-alert--error': type === ALERT_KINDS.error,
      'main-alert--success': type === ALERT_KINDS.success,
      'main-alert--warning': type === ALERT_KINDS.warning,
    },
  );
  const iconClassNames = classNames(
    'main-alert__icon icon',
    {
      'icon-info': type === ALERT_KINDS.error || type === ALERT_KINDS.warning,
      'icon-checked': type === ALERT_KINDS.success,
    },
  );

  return (
    <div className={alertClassNames} data-cy="alert">
      { !hasNoIcon && <i className={iconClassNames} /> }
      <p className="main-alert__text font-600">
        <FormattedOrRawMessage message={message} />
      </p>
      {
        isDiscardable && (
          <button className="main-alert__close" type="button" onClick={onDiscard}>
            <i className="icon icon-cross" />
          </button>
        )
      }
    </div>
  );
};

Alert.defaultProps = {
  className: null,
  hasNoIcon: false,
  type: ALERT_KINDS.error,
  isDiscardable: false,
  onDiscard: null,
};

Alert.propTypes = {
  className: PropTypes.string,
  hasNoIcon: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(ALERT_KINDS)),
  isDiscardable: PropTypes.bool,
  onDiscard: PropTypes.func,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      values: PropTypes.shape(),
    }),
  ]).isRequired,
};

export default Alert;
