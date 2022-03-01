import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'state/modal/actions';
import ModalRootComponent from './component';

class ModalRoot extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return <ModalRootComponent {...this.props} />;
  }
}

const mapStateToProps = state => ({
  modalType: state.modal.modalType,
  modalProps: state.modal.modalProps,
});

const mapDispatchToProps = {
  onClose: hideModal,
};

export { ModalRoot as ModalRootContainer };
export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);
