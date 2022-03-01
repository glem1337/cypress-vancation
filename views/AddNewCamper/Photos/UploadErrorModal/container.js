import { connect } from 'react-redux';

import { hideModal } from 'state/modal/actions';

import UploadErrorModalComponent from './component';

const mapDispatchToProps = {
  hideModal,
};

export default connect(null, mapDispatchToProps)(UploadErrorModalComponent);
