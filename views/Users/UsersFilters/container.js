import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { compose } from 'ramda';

import { filterUsers } from 'state/concepts/users/actions';
import { appliedFilters, filtersSelector } from 'state/concepts/users/selectors';
import UsersFiltersComponent from './component';

class UsersFilters extends React.Component {
  static propTypes = {
    values: PropTypes.shape().isRequired,
    filterUsers: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
  }

  state = {
    isOpen: false,
  }

  handleReset = () => {
    this.props.filterUsers({ roles: [], statuses: [] });
    this.handleClose();
  }

  handleSubmit = () => {
    this.props.filterUsers(this.props.values);
    this.handleClose();
  }

  handleClose = () => {
    this.setState({ isOpen: false });
    this.props.resetForm();
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  }

  handleVisibleChange = visible => (
    visible ? this.handleOpen() : this.handleClose()
  )

  render() {
    return (
      <UsersFiltersComponent
        {...this.props}
        {...this.state}
        onReset={this.handleReset}
        onSubmit={this.handleSubmit}
        onVisibleChange={this.handleVisibleChange}
      />
    );
  }
}

const mapStateToProps = state => ({
  appliedFilters: appliedFilters(state),
  filters: filtersSelector(state),
});

const mapDispatchToProps = {
  filterUsers,
};

export { UsersFilters as UsersFiltersContainer };
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    mapPropsToValues: ({ filters }) => ({
      roles: filters.roles,
      statuses: filters.statuses,
    }),
    enableReinitialize: true,
  }),
)(UsersFilters);
