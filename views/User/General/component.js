import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { prop } from 'ramda';

import Avatar from 'views/shared/Avatar';
import userName from 'utils/users/name';

const UserGeneral = ({ user, editLink }) => (
  <div className="employee-profile__card-section" data-cy="profile-general">
    <p className="employee-profile__card-section-title">
      <span className="mr-8">
        <FormattedMessage id="user.generalInfo" />
      </span>
      {editLink}
    </p>
    <div className="employee-profile__main-info">
      <Avatar
        avatarClassName="employee-profile__userpic"
        sizeClassName="main-userpic--lg"
        user={user}
      />
      <div>
        <p className="employee-profile__subtitle mb-4">
          {userName(user)}
        </p>
        <p className="employee-profile__text in-blue-gray-300 mb-0">
          {prop('email', user)}
        </p>
      </div>
    </div>
    <p className="employee-profile__subtitle in-blue-gray-300">
      {prop('position', user)}
    </p>
    <p className="employee-profile__text max-w-500 white-space-pre-line">
      {prop('about', user)}
    </p>
  </div>
);

UserGeneral.defaultProps = {
  editLink: null,
};

UserGeneral.propTypes = {
  user: PropTypes.shape().isRequired,
  editLink: PropTypes.node,
};

export default UserGeneral;
