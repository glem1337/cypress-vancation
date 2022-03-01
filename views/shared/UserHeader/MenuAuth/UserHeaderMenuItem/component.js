import PropTypes from 'prop-types';
import classNames from 'classnames';
import isRouteActive from 'utils/isRouteActive';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import React from 'react';

const UserHeaderMenuItem = ({
  targetBlankItems,
  keyPage,
  path,
  contentId,
  active,
  itMenu,
}) => (
  <>
    {
      targetBlankItems.includes(keyPage) ? (
        // eslint-disable-next-line react/jsx-no-target-blank
        <a
          href={path}
          target="_blank"
          className={classNames('main-dropdown__item', {
            'in-blue-1000': isRouteActive({ key: keyPage, active }),
            'text-color-gray': !isRouteActive({ key: keyPage, active }) && itMenu,
          })}
        >
          <FormattedMessage id={contentId} />
        </a>
      ) : (
        <Link key={contentId} href={path}>
          <a
            className={classNames('main-dropdown__item', {
              'in-blue-1000': isRouteActive({ key: keyPage, active }),
              'text-color-gray': !isRouteActive({ key: keyPage, active }) && itMenu,
            })}
          >
            <FormattedMessage id={contentId} />
          </a>
        </Link>
      )
    }
  </>
);

UserHeaderMenuItem.defaultProps = {
  targetBlankItems: [],
  itMenu: false,
};

UserHeaderMenuItem.propTypes = {
  targetBlankItems: PropTypes.arrayOf(PropTypes.string),
  keyPage: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  itMenu: PropTypes.bool,
};

export default UserHeaderMenuItem;
