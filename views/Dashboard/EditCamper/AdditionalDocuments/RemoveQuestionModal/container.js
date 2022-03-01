import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteCamperQuestion } from 'state/concepts/camper/actions';
import { loadingSelector } from 'state/data/selectors';
import { deleteCamperQuestionEndpoint } from 'state/concepts/camper/endpoints';

import RemoveQuestionModalComponent from './component';

class RemoveQuestionModal extends React.Component {
  static defaultProps = {
    questionId: null,
  };

  static propTypes = {
    camperId: PropTypes.string.isRequired,
    questionId: PropTypes.string,
    onRemove: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  };

  handleRemove = () => {
    const {
      onRemove,
      index,
      questionId,
      camperId,
      onSubmit,
    } = this.props;

    if (questionId) {
      onSubmit({ questionId, camperId });
    } else {
      onRemove(index);
    }
  };

  render() {
    return (
      <RemoveQuestionModalComponent
        {...this.props}
        submitHandler={this.handleRemove}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state, deleteCamperQuestionEndpoint.endpoint),
});

const mapDispatchToProps = {
  onSubmit: deleteCamperQuestion,
};

export { RemoveQuestionModal as RemoveQuestionModalContainer };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RemoveQuestionModal);
