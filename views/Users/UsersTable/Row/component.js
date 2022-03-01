import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { isNil } from 'ramda';

import { USER_ROLES } from 'constants/users';
import userName from 'utils/users/name';
import Avatar from 'views/shared/Avatar';
import StatusBadge from 'views/User/StatusBadge';
import TableActions from '../Actions';

const UsersTableRow = ({
  user,
  user: {
    email,
    active,
    roleName,
  },
  onClick,
}) => (
  <tr
    onClick={onClick}
    className={classNames({ 'c-pointer': !isNil(onClick) })}
  >
    <td className="main-table__userpic">
      <div className={classNames({ 'op-03': !active })}>
        <Avatar
          imageSize="small"
          user={user}
        />
      </div>
    </td>
    <td>
      <p className="text-subheader mb-0">{userName(user)}</p>
      <span className="in-blue-gray-300">{email}</span>
    </td>
    <td>
      <p className={classNames('text-body in-blue-600', { 'in-gray-500': !active })}>
        <FormattedMessage id={USER_ROLES[roleName]} />
      </p>
    </td>
    <td>
      <StatusBadge user={user} />
    </td>
    <TableActions user={user} />
  </tr>
);

UsersTableRow.displayName = 'UsersTableRow';

UsersTableRow.defaultProps = {
  onClick: undefined,
};

UsersTableRow.propTypes = {
  user: PropTypes.shape({
    avatarUrls: PropTypes.shape().isRequired,
    email: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    roleName: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
};

export default UsersTableRow;
