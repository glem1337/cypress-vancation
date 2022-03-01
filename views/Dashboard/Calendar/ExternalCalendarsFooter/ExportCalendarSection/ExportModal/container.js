import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showMessage as showMessageAction } from 'state/flash-messages/actions';

import ExportModalComponent from './component';

class ExportModal extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    showMessage: PropTypes.func.isRequired,
  };

  onCopyHandler = async () => {
    await navigator.clipboard.writeText(this.props.url);

    this.props.showMessage({
      messageSubTitle: { id: 'shared.copied' },
    });
  };

  render() {
    return <ExportModalComponent onCopy={this.onCopyHandler} {...this.props} />;
  }
}

const mapDispatchToProps = {
  showMessage: showMessageAction,
};

export { ExportModal as ExportModalContainer };
export default connect(null, mapDispatchToProps)(ExportModal);
