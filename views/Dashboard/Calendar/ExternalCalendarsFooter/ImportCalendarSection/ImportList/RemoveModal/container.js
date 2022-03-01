import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadingSelector } from 'state/data/selectors';
import { deleteCamperExternalCalendarEndpoint } from 'state/concepts/camper/endpoints';
import { deleteCamperExternalCalendar } from 'state/concepts/camper/actions';

import RemoveModalComponent from './component';

class RemoveModal extends React.Component {
  static propTypes = {
    calendarId: PropTypes.string.isRequired,
    camperId: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  handleRemove = () => {
    const { camperId, calendarId, onDelete } = this.props;

    onDelete({ calendarId, camperId });
  };

  render() {
    return (
      <RemoveModalComponent {...this.props} handleSubmit={this.handleRemove} />
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: loadingSelector(
    state,
    deleteCamperExternalCalendarEndpoint.endpoint,
  ),
});

const mapDispatchToProps = {
  onDelete: deleteCamperExternalCalendar,
};

export { RemoveModal as RemoveModalContainer };
export default connect(mapStateToProps, mapDispatchToProps)(RemoveModal);
