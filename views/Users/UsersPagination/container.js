import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Pagination from 'views/shared/Pagination';
import { currentPageSelector } from 'state/concepts/users/selectors';
import { pageCountSelector } from 'state/data/selectors';
import {
  setCurrentPage as setCurrentPageAction,
  fetchUsers as fetchUsersAction,
} from 'state/concepts/users/actions';
import { fetchUsersEndpoint } from 'state/concepts/users/endpoints';

const UsersPagination = ({
  pageCount,
  setCurrentPage,
  currentPage,
  fetchUsers,
}) => {
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
    fetchUsers();
  };

  return (
    <Pagination
      onChange={handlePageChange}
      pageCount={pageCount}
      currentPage={currentPage}
    />
  );
};

UsersPagination.defaultProps = {
  pageCount: 0,
};

UsersPagination.propTypes = {
  pageCount: PropTypes.number,
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

const makeMapStateToProps = () => {
  const { endpoint } = fetchUsersEndpoint;

  return state => ({
    pageCount: pageCountSelector(state, endpoint),
    currentPage: currentPageSelector(state),
  });
};

const mapDispatchToProps = {
  setCurrentPage: setCurrentPageAction,
  fetchUsers: fetchUsersAction,
};

export { UsersPagination as UsersPaginationContainer };
export default connect(makeMapStateToProps, mapDispatchToProps)(UsersPagination);
