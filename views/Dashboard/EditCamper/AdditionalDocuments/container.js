import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import yup from 'lib/yupLocalised';
import deepEqual from 'fast-deep-equal';
import { withRouter } from 'next/router';

import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import { leavePage, leavePagePrepare } from 'utils/camper/leavePageHelper';

import {
  DOCUMENTS_ACCEPT_FILES,
  DOCUMENTS_ALLOWED_TYPES,
  DOCUMENTS_MAX_FILES_COUNT,
  DOCUMENTS_MAX_FILES_SIZE,
  QUESTION_MAX_TEXT_LENGTH,
} from 'constants/dashboardAdditionalDocuments';
import { CAMPER_INCLUSION } from 'constants/camper';

import {
  camperDocumentsSelector,
  camperSelector,
  isCamperExistSelector,
} from 'state/concepts/camper/selectors';
import { MESSAGE_TYPE } from 'state/flash-messages/messagesTypes';
import { showMessage as showMessageAction } from 'state/flash-messages/actions';
import {
  showModal as showModalAction,
  hideModal as hideModalAction,
} from 'state/modal/actions';
import {
  createCamperDocuments,
  fetchCamper,
} from 'state/concepts/camper/actions';
import { loadingSelector } from 'state/data/selectors';
import { createCamperDocumentsEndpoint } from 'state/concepts/camper/endpoints';

import DocumentsComponent from './component';

class AdditionalDocuments extends React.Component {
  static propTypes = {
    camperId: PropTypes.string.isRequired,
    camper: PropTypes.shape().isRequired,
    values: PropTypes.shape().isRequired,
    documents: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    setFieldValue: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
  };

  leavePage = leavePage.bind(this);

  leavePagePrepare = leavePagePrepare.bind(this);

  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper;

    const inclusions = [
      CAMPER_INCLUSION.CAMPER_ADDITION.CAMPER_DOCUMENTS,
      CAMPER_INCLUSION.CAMPER_ADDITION.CAMPER_QUESTIONS,
    ];

    ctx.store.dispatch(fetchCamper(camperId, inclusions.join(',')));

    return { camperId };
  };

  componentDidUpdate(prevProps) {
    const { setFieldValue, camper, documents } = this.props;

    if (!deepEqual(prevProps.documents, documents)) {
      setFieldValue('documents', documents);
    }

    const prevQuestions = R.pathOr(
      [],
      ['camper', 'camperAddition', 'camperQuestions'],
      prevProps,
    );

    const questions = R.pathOr(
      [],
      ['camperAddition', 'camperQuestions'],
      camper,
    );

    if (!deepEqual(prevQuestions, questions)) {
      setFieldValue('questions', questions);
    }
  }

  removeDocument = async (id) => {
    const { setFieldValue, values, hideModal } = this.props;

    const documents = values.documents.filter(
      (document) => document.uid !== id,
    );

    await setFieldValue('documents', documents);

    hideModal();
  };

  onRemoveDocuments = (file) => {
    const { showModal, camperId } = this.props;

    showModal({
      modalType: 'REMOVE_DOCUMENT_MODAL',
      modalProps: {
        onRemove: this.removeDocument,
        listId: file.uid,
        documentId: file.id,
        camperId,
      },
    });

    return false;
  };

  validateDocuments = ({ file, fileList }) => {
    const { setFieldValue, showMessage } = this.props;

    const lastDocument = fileList[fileList.length - 1];

    const validDocuments = fileList.filter((document) => {
      const isValidDocumentType = DOCUMENTS_ALLOWED_TYPES.includes(
        document.type,
      );

      const documentSize = (document.size / 1024 / 1024).toFixed(1);
      const isValidDocumentSize = documentSize <= DOCUMENTS_MAX_FILES_SIZE;

      const isCurrentDocument = file.uid === document.uid;

      if (!isValidDocumentType && isCurrentDocument) {
        showMessage({
          messageSubTitle: {
            id: 'dashboard.editCamper.documents.upload.invalidType',
            values: {
              fileName: document.name,
              formats: DOCUMENTS_ACCEPT_FILES,
            },
          },
          messageType: MESSAGE_TYPE.ERROR,
        });
      }

      if (!isValidDocumentSize && isCurrentDocument) {
        showMessage({
          messageSubTitle: {
            id: 'dashboard.editCamper.documents.upload.fileTooLarge',
            values: {
              size: DOCUMENTS_MAX_FILES_SIZE,
              fileName: document.name,
            },
          },
          messageType: MESSAGE_TYPE.ERROR,
        });
      }

      return isValidDocumentType && isValidDocumentSize;
    });

    if (
      validDocuments.length > DOCUMENTS_MAX_FILES_COUNT
      && file.uid === lastDocument.uid
    ) {
      showMessage({
        messageSubTitle: {
          id: 'dashboard.editCamper.documents.upload.tooManyFiles',
          values: {
            number: DOCUMENTS_MAX_FILES_COUNT,
          },
        },
        messageType: MESSAGE_TYPE.WARN,
      });
    }

    const truncated = validDocuments.slice(0, DOCUMENTS_MAX_FILES_COUNT);

    setFieldValue('documents', [...truncated]);
  };

  onAddQuestion = () => {
    const { setFieldValue, values } = this.props;

    const questions = [
      ...values.questions,
      {
        listId: uuid(),
        id: null,
        text: '',
        required: false,
      },
    ];

    setFieldValue('questions', questions);
  };

  removeQuestion = async (index) => {
    const { setFieldValue, values, hideModal } = this.props;

    const questions = values.questions.filter((_, idx) => idx !== index);

    await setFieldValue('questions', questions);

    hideModal();
  };

  onRemoveQuestion =
    ({ index, questionId }) => () => {
      const { showModal, camperId } = this.props;

      showModal({
        modalType: 'REMOVE_QUESTION_MODAL',
        modalProps: {
          onRemove: this.removeQuestion,
          index,
          camperId,
          questionId,
        },
      });
    };

  render() {
    return (
      <DocumentsComponent
        {...this.props}
        onRemoveDocuments={this.onRemoveDocuments}
        validateDocuments={this.validateDocuments}
        onAddQuestion={this.onAddQuestion}
        onRemoveQuestion={this.onRemoveQuestion}
        leavePagePrepare={this.leavePagePrepare}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
  camper: camperSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(state, createCamperDocumentsEndpoint.endpoint),
  documents: camperDocumentsSelector(state, ownProps?.camperId),
});

const mapDispatchToProps = {
  showMessage: showMessageAction,
  showModal: showModalAction,
  hideModal: hideModalAction,
  onSubmit: createCamperDocuments,
};

export { AdditionalDocuments as AdditionalDocumentsContainer };
export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    mapPropsToValues: ({ camper, documents }) => ({
      documents,
      questions: R.pathOr([], ['camperAddition', 'camperQuestions'], camper),
    }),
    validationSchema: yup.object().shape({
      questions: yup.array().of(
        yup.object().shape({
          text: yup
            .string()
            .max(QUESTION_MAX_TEXT_LENGTH, {
              id: 'validations.max',
              values: {
                pref: 'Question',
                value: QUESTION_MAX_TEXT_LENGTH,
              },
            })
            .required({
              id: 'validations.cantBeBlank',
              values: { pref: 'Question' },
            }),
        }),
      ),
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),
  withRouter,
)(AdditionalDocuments);
