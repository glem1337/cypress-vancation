import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadingSelector } from 'state/data/selectors';
import { updateCamperStatusEndpoint } from 'state/concepts/camper/endpoints';
import { updateCamperStatus } from 'state/concepts/camper/actions';

import CamperStatusModalComponent from './component';

class CamperStatusModal extends React.Component {
  static propTypes = {
    camperId: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = () => {
    const { camperId, onSubmit, status } = this.props;

    onSubmit({ status, camperId });
  };

  render() {
    return (
      <CamperStatusModalComponent
        {...this.props}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state, updateCamperStatusEndpoint.endpoint),
});

const mapDispatchToProps = {
  onSubmit: updateCamperStatus,
};

export { CamperStatusModal as CamperStatusModalContainer };
export default connect(mapStateToProps, mapDispatchToProps)(CamperStatusModal);
