import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteCamperDocument } from 'state/concepts/camper/actions';
import { loadingSelector } from 'state/data/selectors';
import { deleteCamperDocumentEndpoint } from 'state/concepts/camper/endpoints';

import RemoveDocumentModalComponent from './component';

class RemoveDocumentModal extends React.Component {
  static defaultProps = {
    documentId: null,
  };

  static propTypes = {
    onRemove: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    documentId: PropTypes.string,
    camperId: PropTypes.string.isRequired,
    listId: PropTypes.string.isRequired,
  };

  handleRemove = () => {
    const {
      onRemove,
      listId,
      documentId,
      camperId,
      onSubmit,
    } = this.props;

    if (documentId) {
      onSubmit({ documentId, camperId });
    } else {
      onRemove(listId);
    }
  };

  render() {
    return (
      <RemoveDocumentModalComponent
        {...this.props}
        submitHandler={this.handleRemove}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state, deleteCamperDocumentEndpoint.endpoint),
});

const mapDispatchToProps = {
  onSubmit: deleteCamperDocument,
};

export { RemoveDocumentModal as RemoveDocumentModalContainer };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RemoveDocumentModal);
