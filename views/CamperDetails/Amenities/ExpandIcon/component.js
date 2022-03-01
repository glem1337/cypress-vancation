import { Button } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const ExpandIcon = ({ isActive }) => (
  <Button
    className={classNames({
      'border-none': isActive,
    })}
    type={classNames({
      secondary: !isActive,
    })}
    icon={(
      <i
        className={classNames('icon font-12 in-blue-1000', {
          'icon-down': !isActive,
          'icon-up': isActive,
        })}
      />
    )}
    size="small"
    shape="circle"
  />
);

ExpandIcon.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default ExpandIcon;
