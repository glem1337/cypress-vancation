import { PropTypes } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import userStatus from 'utils/users/status';

const UserStatusBadge = ({ user, user: { active } }) => (
  <div
    className={classNames('main-badge', {
      'bg-green-500 in-white': active,
      'bg-orange-600 in-white': !active,
    })}
  >
    <FormattedMessage id={userStatus(user)} />
  </div>
);

UserStatusBadge.propTypes = {
  user: PropTypes.shape({
    active: PropTypes.bool.isRequired,
  }).isRequired,
};

export default UserStatusBadge;
