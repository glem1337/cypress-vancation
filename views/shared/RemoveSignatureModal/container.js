import React from 'react';
import { connect } from 'react-redux';

import { loadingSelector } from 'state/data/selectors';
import { deleteCamperPhotoEndpoint, deleteCustomTripFeeEndpoint } from 'state/concepts/camper/endpoints';

import RemoveSignatureModalComponent from './component';

// eslint-disable-next-line react/prefer-stateless-function
class RemoveSignatureModal extends React.Component {
  render() {
    return (
      <RemoveSignatureModalComponent
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state, deleteCamperPhotoEndpoint.endpoint)
    || loadingSelector(state, deleteCustomTripFeeEndpoint.endpoint),
});

export { RemoveSignatureModal as RemoveSignatureModalContainer };
export default connect(mapStateToProps)(RemoveSignatureModal);
