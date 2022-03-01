import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sortSelector } from 'state/concepts/users/selectors';
import { setSortOrder, fetchUsers } from 'state/concepts/users/actions';
import TableHeadCell from 'views/shared/TableHeadCell';

class UsersTableCellHead extends React.Component {
  static propTypes = {
    setSortOrder: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
  };

  handleSort = sortKey => () => {
    this.props.setSortOrder(sortKey);
    this.props.fetchUsers();
  };

  render() {
    return (
      <TableHeadCell
        onSort={this.handleSort}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  sortParams: sortSelector(state),
});

const mapDispatchToProps = {
  setSortOrder,
  fetchUsers,
};

export { UsersTableCellHead as UsersTableCellHeadContainer };
export default connect(mapStateToProps, mapDispatchToProps)(UsersTableCellHead);
