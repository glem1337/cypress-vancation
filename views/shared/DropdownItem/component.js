import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

const DropdownItem = ({
  id,
  className,
  icon,
  text,
  label,
  onClick,
  disabled,
  isHidden,
}) => {
  const iconClassNames = classNames(
    'icon mr-12 in-gray-600',
    {
      'icon-live-preview': icon === 'live-preview',
      'icon-time': icon === 'time',
    },
  );

  return !isHidden && (
    <button
      id={id}
      className={classNames(className, 'main-dropdown__item', { 'main-dropdown__item--separated': label })}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {label ? (
        <span className="main-dropdown__item-container">
          <span className="main-dropdown__item-label">
            <FormattedMessage {...label} />
          </span>
          <span className="main-dropdown__item-wrap">
            {icon && <span className={iconClassNames} />}
            <FormattedMessage {...text} />
          </span>
        </span>
      ) : (
        <span>
          {icon && <span className={iconClassNames} />}
          <FormattedMessage {...text} />
        </span>
      )}
    </button>
  );
};

DropdownItem.defaultProps = {
  id: undefined,
  className: null,
  disabled: false,
  onClick: () => {},
  isHidden: false,
  icon: null,
  label: null,
};

DropdownItem.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.shape({
    id: PropTypes.string.isRequired,
    values: PropTypes.shape(),
  }),
  text: PropTypes.shape({
    id: PropTypes.string.isRequired,
    values: PropTypes.shape(),
  }).isRequired,
  disabled: PropTypes.bool,
  isHidden: PropTypes.bool,
};

export default DropdownItem;
