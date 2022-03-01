import PropTypes from 'prop-types';
import { Switch } from 'antd';
import { FormattedMessage } from 'react-intl';
import { is } from 'ramda';

import isPresent from 'utils/isPresent';

const SmallSwitchCard = ({
  icon,
  title,
  description,
  checked,
  onChange,
  onCardClick,
  disabled,
  children,
  showChildren,
}) => (
  <div className="edit-list-switch-card">
    <div
      className="d-flex align-items-center w-100"
      onClick={onCardClick}
      role="button"
    >
      <img className="edit-list-switch-card__icon" src={icon} alt="" />
      <p className="edit-list-switch-card__title">
        {is(Object, title) ? <FormattedMessage {...title} /> : title}
      </p>
      <div className="d-inline-flex align-items-center ml-auto">
        <Switch onChange={onChange} checked={checked} disabled={disabled} />
      </div>
    </div>
    {isPresent(description) && (
      <div className="edit-list-switch-card__inner w-100 pt-0">
        <p className="edit-list-switch-card__inner-txt">
          {is(Object, title) ? (
            <FormattedMessage {...description} />
          ) : (
            description
          )}
        </p>
      </div>
    )}
    {isPresent(children) && showChildren && (
      <div className="edit-list-switch-card__inner">{children}</div>
    )}
  </div>
);

SmallSwitchCard.defaultProps = {
  description: null,
  disabled: false,
  showChildren: false,
  children: null,
};

SmallSwitchCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]).isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  checked: PropTypes.bool.isRequired,
  showChildren: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default SmallSwitchCard;
