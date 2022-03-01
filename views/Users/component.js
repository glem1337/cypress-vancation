import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import Button from 'views/shared/Button';
import SearchList from 'views/shared/SearchList';
import NoSearchResult from 'views/shared/NoSearchResult';
import NotificationsDock from 'views/NotificationsDock';
import UsersTable from './UsersTable';
import UsersPagination from './UsersPagination';
import UsersFilters from './UsersFilters';

const UsersComponent = ({
  users,
  totalCount,
  isLoading,
  searchQuery,
  filterUsers,
}) => {
  const isNotFound = isEmpty(users) && isLoading === false;

  return (
    <div className="main-page d-block flex-basis-auto">
      <NotificationsDock />

      <div className="main-page__header">
        <h1 className="font-700 mb-0 font-transition">
          <span className="mr-12">
            <FormattedMessage id="users.title" />
          </span>
          <span className="in-gray-700">{totalCount}</span>
        </h1>

        <Button
          className="main-page__invite-btn min-w-96"
          onClick={() => {}}
          type="submit"
          icon="plus"
          text={{ id: 'users.add' }}
          size="medium"
        />
      </div>

      <div
        className={classNames('main-backdrop', {
          'flex-grow-0': isNotFound,
          'mb-16': !isNotFound,
        })}
      >
        <div className="main-page__filter">
          <SearchList
            defaultValue={searchQuery}
            filterEntities={filterUsers}
          />
          <UsersFilters />
        </div>

        {!isEmpty(users) && (
          <UsersTable
            users={users}
          />
        )}
      </div>

      {isNotFound && <NoSearchResult />}
      <UsersPagination />
    </div>
  );
};

UsersComponent.defaultProps = {
  totalCount: 0,
  isLoading: undefined,
};

UsersComponent.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  totalCount: PropTypes.number,
  isLoading: PropTypes.bool,
  searchQuery: PropTypes.string.isRequired,
  filterUsers: PropTypes.func.isRequired,
};

export default UsersComponent;
