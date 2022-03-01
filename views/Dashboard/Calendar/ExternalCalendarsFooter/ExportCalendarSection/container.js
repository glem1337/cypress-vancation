import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createCamperCalendarExportLink as createCamperCalendarExportLinkAction } from 'state/concepts/camper/actions';
import { loadingSelector } from 'state/data/selectors';
import { createCamperCalendarExportLinkEndpoint } from 'state/concepts/camper/endpoints';
import ExportCalendarSectionComponent from './component';

class ExportCalendarSection extends React.Component {
  static propTypes = {
    createCamperCalendarExportLink: PropTypes.func.isRequired,
    camperId: PropTypes.string.isRequired,
  };

  onExport = () => {
    const { createCamperCalendarExportLink, camperId } = this.props;

    createCamperCalendarExportLink(camperId);
  };

  render() {
    return (
      <ExportCalendarSectionComponent
        {...this.props}
        onExport={this.onExport}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: loadingSelector(
    state,
    createCamperCalendarExportLinkEndpoint.endpoint,
  ),
});

const mapDispatchToProps = {
  createCamperCalendarExportLink: createCamperCalendarExportLinkAction,
};

export { ExportCalendarSection as ExportCalendarSectionContainer };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExportCalendarSection);
