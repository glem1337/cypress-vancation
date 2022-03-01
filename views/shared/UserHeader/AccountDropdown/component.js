import React from 'react';
import PropTypes from 'prop-types';
import { pathOr } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Avatar } from 'antd';

import Dropdown from 'views/shared/Dropdown';
import { HEADER_USER_ITEMS } from 'constants/headers';
import userInitials from 'utils/userInitials';
import ROUTES from 'constants/routes';
import isPresent from 'utils/isPresent';

import UserHeaderMenuItem from './UserHeaderMenuItem';

const UserDropdown = ({
  currentUser,
  visible,
  onVisibleChange,
  active,
  handlerSignOut,
  getPopupContainer,
}) => {
  if (!isPresent(currentUser)) {
    return null;
  }

  const email = pathOr('', ['email'], currentUser);
  const { firstName, lastName, avatarUrl } = pathOr(
    { firstName: '', lastName: '', avatarUrl: null },
    ['user'],
    currentUser,
  );

  return (
    <Dropdown
      icon={(
        <div id="main-account-header__user" className="relative">
          <Avatar className="d-none d-lg-block c-pointer" src={avatarUrl}>
            {userInitials(firstName, lastName)}
          </Avatar>
        </div>
      )}
      placement="bottomRight"
      onVisibleChange={onVisibleChange}
      visible={visible}
      overlayClassName="main-account-header__user-dropdown"
      getPopupContainer={getPopupContainer}
    >
      <div className="main-dropdown-wrap">
        <div className="main-dropdown__body">
          <div className="main-dropdown__item pt-8 pb-16">
            <Avatar size="large" className="mr-12" src={avatarUrl}>
              {userInitials(firstName, lastName)}
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <div
                className="text-subheader text-truncate"
                title={`${firstName} ${lastName}`}
              >
                {`${firstName} ${lastName}`}
              </div>
              <div
                className="text-caption text-color-gray text-truncate"
                title={email}
              >
                {email}
              </div>
            </div>
          </div>
          {HEADER_USER_ITEMS.map((elem) => (
            <UserHeaderMenuItem
              {...elem}
              keyPage={elem.key}
              active={active}
              targetBlankItems={[ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.KEY]}
            />
          ))}
          <button
            onClick={handlerSignOut}
            type="button"
            className="main-dropdown__item in-gray-700"
          >
            <i className="icon icon-log-out in-gray-500 mr-8" />
            <FormattedMessage id="headerHeader.logout" />
          </button>
        </div>
      </div>
    </Dropdown>
  );
};

UserDropdown.defaultProps = {
  currentUser: null,
  active: '',
};

UserDropdown.propTypes = {
  visible: PropTypes.bool.isRequired,
  onVisibleChange: PropTypes.func.isRequired,
  handlerSignOut: PropTypes.func.isRequired,
  active: PropTypes.string,
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    user: PropTypes.shape({
      lastName: PropTypes.string,
      firstName: PropTypes.string,
      avatarUrl: PropTypes.string,
    }).isRequired,
  }),
  getPopupContainer: PropTypes.func.isRequired,
};

export default UserDropdown;
