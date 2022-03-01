import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { prop } from 'ramda';

const UserLocation = ({ user, editLink }) => (
  <div className="employee-profile__card-section" data-cy="profile-location">
    <p className="employee-profile__card-section-title">
      <span className="mr-8">
        <FormattedMessage id="user.location" />
      </span>
      {editLink}
    </p>
    <p className="employee-profile__text mb-8">
      <FormattedMessage id="user.country" values={{ country: prop('country', user) }} />
    </p>
    <p className="employee-profile__text">
      <FormattedMessage id="user.city" values={{ city: prop('city', user) }} />
    </p>
  </div>
);

UserLocation.defaultProps = {
  editLink: null,
};

UserLocation.propTypes = {
  user: PropTypes.shape().isRequired,
  editLink: PropTypes.node,
};

export default UserLocation;
