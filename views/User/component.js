import Link from 'next/link';
import { PropTypes } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { prop } from 'ramda';

import { USER_ROLES } from 'constants/users';
import userName from 'utils/users/name';
import Button from 'views/shared/Button';
import Location from './Location';
import General from './General';
import StatusBadge from './StatusBadge';
import EditLink from './EditLink';

const UserComponent = ({ user, isSessionUser, canEdit }) => (
  <div className="main-page">
    <div className="container">
      <div className="mb-16">
        <Link href="/users">
          <a className="link-btn mb-16">
            <i className="icon icon-arrow-left mr-4" />
            <FormattedMessage id="users.listOfUsers" />
          </a>
        </Link>

        <div className="d-flex justify-content-space-between align-items-center">
          <div className="d-flex align-items-center">
            <h1 className="text-headline mb-0 mr-12">{userName(user)}</h1>
            {isSessionUser && (
              <span className="in-gray-700 font-20 font-700 mr-16">
                <FormattedMessage id="user.you" />
              </span>
            )}
            <StatusBadge user={user} />
          </div>
          <Link
            href="/users/[userId]/edit"
            as={`/users/${user.id}/edit`}
          >
            <Button
              text={{ id: 'shared.edit' }}
              icon="edit"
              size="medium"
              disabled={!canEdit}
            />
          </Link>
        </div>
        <p className="in-blue-600 mb-0">
          <FormattedMessage id={USER_ROLES[prop('roleName', user)]} />
        </p>
      </div>
      <div className="main-card">
        <div className="main-card__container">
          <General
            user={user}
            editLink={canEdit && <EditLink userId={user.id} />}
          />
          <Location
            user={user}
            editLink={canEdit && <EditLink userId={user.id} />}
          />
        </div>
      </div>
    </div>
  </div>
);

UserComponent.propTypes = {
  user: PropTypes.shape().isRequired,
  isSessionUser: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool.isRequired,
};

export default UserComponent;
