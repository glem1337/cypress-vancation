import { shallow } from 'enzyme';
import * as R from 'ramda';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import describeValidationSchema from 'utils/testHelpers/describeValidationSchema';

import {
  DOCUMENTS_ACCEPT_FILES,
  DOCUMENTS_MAX_FILES_COUNT,
  DOCUMENTS_MAX_FILES_SIZE,
} from 'constants/dashboardAdditionalDocuments';
import { CAMPER_INCLUSION } from 'constants/camper';

import { MESSAGE_TYPE } from 'state/flash-messages/messagesTypes';
import { showMessage } from 'state/flash-messages/actions';
import { fetchCamper } from 'state/concepts/camper/actions';
import { hideModal, showModal } from 'state/modal/actions';

import mockedCamper from 'views/__mocks__/camper';
import mockedCamperDocuments from '../__mocks__/camperDocuments';

import AdditionalDocuments, {
  AdditionalDocumentsContainer,
} from '../container';

jest.mock('state/concepts/camper/selectors', () => ({
  isCamperExistSelector: jest.fn(() => true),
  camperSelector: jest.fn(() => mockedCamper),
  camperDocumentsSelector: jest.fn(() => mockedCamperDocuments),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('formik', () => ({
  withFormik: (config) => (Component) => (props) => {
    const extended = {
      ...config,
      ...props,
      validationSchema: () => config.validationSchema,
    };

    return <Component {...extended} />;
  },
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

describe('AdditionalDocuments container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    setFieldValue: jest.fn(),
    handleSubmit: jest.fn(),
    camperId: 'test',
    values: {
      documents: [
        {
          uid: 'id',
        },
      ],
      questions: [
        {
          text: 'some phrase',
          required: false,
        },
      ],
    },
    isValid: true,
    router: {
      push: jest.fn(),
    },
  };

  let wrapper;
  let container;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<AdditionalDocuments {...props} />);
    container = diveTo(wrapper, AdditionalDocumentsContainer);
    instance = container.instance();

    jest.clearAllMocks();
  });

  it('container snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('has validation schema', () => {
    expect(describeValidationSchema(wrapper)).toMatchSnapshot();
  });

  it('checks mapPropsToValues configs', () => {
    expect(
      container.props().mapPropsToValues(container.props()),
    ).toMatchSnapshot();
  });

  it('tests "getInitialProps" static method', async () => {
    const ctx = {
      store,
      query: {
        camper: 'id',
      },
    };

    await AdditionalDocumentsContainer.getInitialProps(ctx);

    const inclusions = [
      CAMPER_INCLUSION.CAMPER_ADDITION.CAMPER_DOCUMENTS,
      CAMPER_INCLUSION.CAMPER_ADDITION.CAMPER_QUESTIONS,
    ];

    expect(store.dispatch).toHaveBeenCalledWith(
      fetchCamper('id', inclusions.join(',')),
    );
  });

  describe('checks `componentDidUpdate` instance method', () => {
    it('when documents is empty', () => {
      const prevProps = {
        documents: [],
      };

      instance.componentDidUpdate(prevProps);

      expect(props.setFieldValue).toHaveBeenCalledWith(
        'documents',
        mockedCamperDocuments,
      );
    });

    it('when questions is empty', () => {
      const prevProps = {
        documents: [],
        camper: {
          camperAddition: {
            camperQuestions: [],
          },
        },
      };

      instance.componentDidUpdate(prevProps);

      expect(props.setFieldValue).toHaveBeenCalledWith(
        'questions',
        mockedCamper.camperAddition.camperQuestions,
      );
    });
  });

  it('tests "removeDocument" instance method', async () => {
    await instance.removeDocument('id');

    const documents = props.values.documents.filter(
      (document) => document.uid !== 'id',
    );

    expect(props.setFieldValue).toHaveBeenCalledWith('documents', documents);
    expect(store.dispatch).toHaveBeenCalledWith(hideModal());
  });

  it('tests "onRemoveDocuments" instance method', () => {
    instance.onRemoveDocuments({ uid: '1', id: '2' });

    expect(store.dispatch).toHaveBeenCalledWith(
      showModal({
        modalType: 'REMOVE_DOCUMENT_MODAL',
        modalProps: {
          onRemove: instance.removeDocument,
          listId: '1',
          documentId: '2',
          camperId: props.camperId,
        },
      }),
    );
  });

  describe('tests "validateDocuments" instance method', () => {
    it('setFieldValue should be called', () => {
      const files = [
        {
          uid: 1,
          name: 'file name',
          type: 'application/pdf',
          size: 1,
        },
      ];

      instance.validateDocuments({
        file: {
          uid: 1,
        },
        fileList: files,
      });

      expect(props.setFieldValue).toHaveBeenCalledWith('documents', files);
    });

    it('when document type isn`t valid', () => {
      instance.validateDocuments({
        file: {
          uid: 1,
        },
        fileList: [
          {
            uid: 1,
            name: 'file name',
            type: 'wrong document type',
          },
        ],
      });

      expect(store.dispatch).toHaveBeenCalledWith(
        showMessage({
          messageSubTitle: {
            id: 'dashboard.editCamper.documents.upload.invalidType',
            values: {
              fileName: 'file name',
              formats: DOCUMENTS_ACCEPT_FILES,
            },
          },
          messageType: MESSAGE_TYPE.ERROR,
        }),
      );
    });

    it('when document size isn`t valid', () => {
      instance.validateDocuments({
        file: {
          uid: 1,
        },
        fileList: [
          {
            uid: 1,
            name: 'file name',
            type: 'application/pdf',
            size: 51 * 1024 * 1024,
          },
        ],
      });

      expect(store.dispatch).toHaveBeenCalledWith(
        showMessage({
          messageSubTitle: {
            id: 'dashboard.editCamper.documents.upload.fileTooLarge',
            values: {
              fileName: 'file name',
              size: DOCUMENTS_MAX_FILES_SIZE,
            },
          },
          messageType: MESSAGE_TYPE.ERROR,
        }),
      );
    });

    it('when documents is too many', () => {
      instance.validateDocuments({
        file: {
          uid: 6,
        },
        fileList: R.range(1, 7).map((id) => ({
          uid: id,
          name: 'file name',
          type: 'application/pdf',
          size: 1,
        })),
      });

      expect(store.dispatch).toHaveBeenCalledWith(
        showMessage({
          messageSubTitle: {
            id: 'dashboard.editCamper.documents.upload.tooManyFiles',
            values: {
              number: DOCUMENTS_MAX_FILES_COUNT,
            },
          },
          messageType: MESSAGE_TYPE.WARN,
        }),
      );
    });
  });

  it('tests "onAddQuestion" instance method', () => {
    instance.onAddQuestion();

    const questions = [
      ...props.values.questions,
      {
        listId: 'uuid/v4',
        id: null,
        text: '',
        required: false,
      },
    ];

    expect(props.setFieldValue).toHaveBeenCalledWith('questions', questions);
  });

  it('tests "removeQuestion" instance method', async () => {
    await instance.removeQuestion(0);

    const questions = props.values.questions.filter((_, idx) => idx !== 0);

    expect(props.setFieldValue).toHaveBeenCalledWith('questions', questions);
    expect(store.dispatch).toHaveBeenCalledWith(hideModal());
  });

  it('tests "onRemoveQuestion" instance method', () => {
    instance.onRemoveQuestion({ index: 0, questionId: '1' })();

    expect(store.dispatch).toHaveBeenCalledWith(
      showModal({
        modalType: 'REMOVE_QUESTION_MODAL',
        modalProps: {
          onRemove: instance.removeQuestion,
          index: 0,
          camperId: props.camperId,
          questionId: '1',
        },
      }),
    );
  });
});
