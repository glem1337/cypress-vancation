import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Avatar } from 'antd';
import classnames from 'classnames';
import Link from 'next/link';
import { pathOr } from 'ramda';

import { USER_DROPDOWN_ITEMS } from 'constants/dashboard';
import Dropdown from 'views/shared/Dropdown';
import userInitials from 'utils/userInitials';
import isPresent from 'utils/isPresent';

const UserDropdown = ({
  currentUser,
  signOut,
}) => {
  if (!isPresent(currentUser)) {
    return null;
  }

  const email = pathOr('', ['email'], currentUser);
  const firstName = pathOr('', ['user', 'firstName'], currentUser);
  const lastName = pathOr('', ['user', 'lastName'], currentUser);
  const avatarUrl = pathOr('', ['user', 'avatarUrl'], currentUser);

  return (
    <Dropdown
      icon={(
        <div id="main-account-header__user" className="relative">
          <Avatar
            className="d-none d-lg-block c-pointer"
            src={avatarUrl}
          >
            {userInitials(firstName, lastName)}
          </Avatar>
        </div>
      )}
      placement="bottomRight"
      overlayClassName="main-dropdown"
    >
      <div className="main-dropdown-wrap">
        <div className="main-dropdown__body">
          <div className="main-dropdown__item pt-8 pb-16">
            <Avatar
              size="large"
              className="mr-12"
              src={avatarUrl}
            >
              {userInitials(firstName, lastName)}
            </Avatar>
            <div>
              <div className="text-subheader ">
                {`${firstName} ${lastName}`}
              </div>
              <div className="text-caption text-color-gray">
                {email}
              </div>
            </div>
          </div>
          {USER_DROPDOWN_ITEMS.map(elem => {
            const Wrapper = elem.route
              ? Link
              : React.Fragment;

            const wrapperProps = elem.route
              ? { href: elem.route }
              : undefined;

            return (
              <Wrapper {...wrapperProps} key={elem.id}>
                <a
                  target="_blank"
                  rel="noreferer"
                  className={classnames('main-dropdown__item', {
                  'in-blue-1000': elem.selected,
                  'text-color-gray': !elem.selected,
                })}
                >
                  <FormattedMessage id={elem.id} />
                </a>
              </Wrapper>
            );
          })}
          <button onClick={signOut} type="button" className="main-dropdown__item in-gray-700">
            <i className="icon icon-log-out in-gray-500 mr-8" />
            <FormattedMessage id="headerHeader.logout" />
          </button>
        </div>
      </div>
    </Dropdown>
  );
};

UserDropdown.propTypes = {
  signOut: PropTypes.func.isRequired,
  currentUser: PropTypes.shape(),
};

UserDropdown.defaultProps = {
  currentUser: null,
};

export default UserDropdown;
