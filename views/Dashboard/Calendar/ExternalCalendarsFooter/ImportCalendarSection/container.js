import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showModal as showModalAction } from 'state/modal/actions';

import ImportCalendarSectionComponent from './component';

class ImportCalendarSection extends React.Component {
  static propTypes = {
    showModal: PropTypes.func.isRequired,
    camperId: PropTypes.string.isRequired,
  };

  showImportModal = () => {
    const { showModal, camperId } = this.props;

    showModal({
      modalType: 'CALENDAR_IMPORT_MODAL',
      modalProps: {
        camperId,
      },
    });
  };

  render() {
    return (
      <ImportCalendarSectionComponent
        {...this.props}
        onShowImportModal={this.showImportModal}
      />
    );
  }
}

const mapDispatchToProps = {
  showModal: showModalAction,
};

export { ImportCalendarSection as ImportCalendarSectionContainer };
export default connect(
  null,
  mapDispatchToProps,
)(ImportCalendarSection);
