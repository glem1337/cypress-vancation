import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { camperExternalCalendarsSelector } from 'state/concepts/camper/selectors';
import { showModal as showModalAction } from 'state/modal/actions';

import ImportListComponent from './component';

class ImportList extends React.Component {
  static propTypes = {
    showModal: PropTypes.func.isRequired,
    camperId: PropTypes.string.isRequired,
  };

  showRemoveModal = (calendarId) => () => {
    const { showModal, camperId } = this.props;

    showModal({
      modalType: 'CALENDAR_IMPORT_REMOVE_MODAL',
      modalProps: {
        calendarId,
        camperId,
      },
    });
  };

  showEditModal = (calendar) => () => {
    const { showModal, camperId } = this.props;

    showModal({
      modalType: 'CALENDAR_IMPORT_EDIT_MODAL',
      modalProps: {
        calendarId: calendar.id,
        camperId,
        name: calendar?.name || '',
        link: calendar?.link || '',
      },
    });
  };

  render() {
    return (
      <ImportListComponent
        {...this.props}
        onRemove={this.showRemoveModal}
        onEdit={this.showEditModal}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  items: camperExternalCalendarsSelector(state),
});

const mapDispatchToProps = {
  showModal: showModalAction,
};

export { ImportList as ImportListContainer };
export default connect(mapStateToProps, mapDispatchToProps)(ImportList);
