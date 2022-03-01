import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Sortable from 'sortablejs';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import mockedCamperPhotos from 'views/__mocks__/camperPhotos';
import {
  checkPreviousStepCompleteness,
  deleteCamperPhoto,
  createBatchCamperPhotos,
  fetchCamper,
} from 'state/concepts/camper/actions';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import ROUTES from 'constants/routes';
import { FORM_VALIDATION } from 'constants/camper';
import {
  dataApiSuccess,
  dataDelete,
  dataDeleteEntity,
} from 'state/data/actions';
import {
  showModal,
  hideModal,
} from 'state/modal/actions';
import fakeIntl from 'utils/testHelpers/fakeIntl';
import { INFO_MODAL_ICON_TYPE } from 'views/shared/InfoModal/types';
import { isCamperExistSelector, camperPhotosSelector } from 'state/concepts/camper/selectors';
import redirect from 'utils/redirect';

import ListingPhotos, { ListingPhotosContainer } from '../container';

jest.mock('utils/redirect', () => jest.fn());

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  camperPhotosSelector: jest.fn(() => mockedCamperPhotos),
  isCamperExistSelector: jest.fn(() => true),
  camperCompletenessSelector: jest.fn(() => 324),
  leavePageMethodSelector: jest.fn(() => jest.fn()),
}));

jest.spyOn(Sortable, 'create');

jest.mock('formik', () => ({
  withFormik: (config) => (Component) => props => {
    const extended = {
      ...config,
      ...props,
      validationSchema: () => config.validationSchema,
    };

    return <Component {...extended} />;
  },
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<ListingPhotos {...props} />, { disableLifecycleMethods: true });
  const container = diveTo(wrapper, ListingPhotosContainer);
  const instance = container.instance();
  const checkMainButtonVisibilitySpy = jest.spyOn(instance, 'checkMainButtonVisibility');
  const checkUploadButtonPositionSpy = jest.spyOn(instance, 'checkUploadButtonPosition');
  const showMaxCountModalSpy = jest.spyOn(instance, 'showMaxCountModal');

  return {
    wrapper,
    container,
    instance,
    checkMainButtonVisibilitySpy,
    checkUploadButtonPositionSpy,
    showMaxCountModalSpy,
  };
};

describe('ListingPhotos container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();
  store.logicMiddleware = {
    whenComplete: jest.fn(),
  };

  const props = {
    store,
    router: {
      push: jest.fn(),
      replace: jest.fn(),
      query: {
        main: 'mainPhoto',
      },
    },
    camperId: 'camperId',
    intl: fakeIntl,
  };

  let container = null;
  let instance = null;
  let checkMainButtonVisibilitySpy = null;
  let checkUploadButtonPositionSpy = null;
  let showMaxCountModalSpy = null;

  beforeAll(() => {
    window.URL.createObjectURL = jest.fn();
  });

  afterAll(() => {
    window.URL.createObjectURL.mockReset();
  });

  beforeEach(() => {
    ({
      container,
      instance,
      checkMainButtonVisibilitySpy,
      checkUploadButtonPositionSpy,
      showMaxCountModalSpy,
    } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `getInitialProps` static method', async () => {
    const ctx = {
      store,
      query: {
        camper_id: 'camperId',
      },
    };

    await ListingPhotosContainer.getInitialProps(ctx);

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      1,
      dataDeleteEntity({ kind: 'camperPhoto' }),
    );
    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      2,
      fetchCamper(ctx.query.camper_id, 'camper_photos'),
    );
    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      3,
      checkPreviousStepCompleteness({
        key: ROUTES.ADD_NEW_CAMPER.LISTING_PHOTOS.KEY,
        camperId: 'camperId',
        ctx,
      }),
    );

    expect(store.logicMiddleware.whenComplete).toHaveBeenCalled();
  });

  describe('checks `componentDidMount` instance method', () => {
    it('when camper exists', () => {
      const sortContainer = document.createElement('div');
      sortContainer.id = 'camper-photo__sortable-section';
      document.body.appendChild(sortContainer);

      instance.componentDidMount();

      expect(Sortable.create).toHaveBeenCalledWith(sortContainer, {
        draggable: '.camper-photo__uploaded-item',
        onChange: instance.onOrderChange,
      });

      expect(checkMainButtonVisibilitySpy).toHaveBeenCalled();
    });

    it('when camper does not exist', () => {
      isCamperExistSelector.mockReturnValueOnce(false);

      ({ instance } = layoutContainer(props));

      instance.componentDidMount();

      expect(Sortable.create).not.toHaveBeenCalled();
    });
  });

  it('checks `onOrderChange` instance method', () => {
    instance.onOrderChange();

    expect(checkUploadButtonPositionSpy).toHaveBeenCalled();
    expect(checkMainButtonVisibilitySpy).toHaveBeenCalled();
  });

  it('checks `showMaxCountModal` instance method', () => {
    const diff = instance.showMaxCountModal();

    expect(store.dispatch).toHaveBeenCalledWith(showModal({
      modalType: 'INFO_MODAL',
      modalProps: {
        title: fakeIntl.formatMessage({ id: 'shared.error' }),
        subTitle: fakeIntl.formatMessage({ id: 'addNewCamper.photo.tooManyFilesFixed' }, { difference: diff }),
        iconType: INFO_MODAL_ICON_TYPE.ERROR,
      },
    }));

    expect(diff).toBe(FORM_VALIDATION.MAX_PHOTOS_COUNT - mockedCamperPhotos.length);
  });

  describe('checks `onDropHandler` instance method', () => {
    it('when more than 30, that allowed', () => {
      const acceptedFiles = [...Array(FORM_VALIDATION.MAX_PHOTOS_COUNT).keys()].map(id => ({ id }));

      instance.onDropHandler(acceptedFiles);

      expect(showMaxCountModalSpy).toHaveBeenCalled();
    });

    it('when count is correct', () => {
      const acceptedFiles = [...Array(2).keys()].map(() => {
        const file = new File(['foo'], 'foo.txt', {
          type: 'text/plain',
        });

        return file;
      });

      const data = instance.onDropHandler(acceptedFiles);

      expect(showMaxCountModalSpy).not.toHaveBeenCalled();
      expect(props.store.dispatch).toHaveBeenCalledWith(
        dataApiSuccess({ response: { camperPhoto: data } }),
      );
    });
  });

  it('checks `deletePhotoLocal` instance method', () => {
    instance.deletePhotoLocal('1')();

    expect(props.store.dispatch).toHaveBeenCalledTimes(2);
    expect(props.store.dispatch).toHaveBeenCalledWith(
      dataDelete({
        kind: 'camperPhoto',
        ids: ['1'],
      }),
    );
    expect(props.store.dispatch).toHaveBeenCalledWith(
      hideModal(),
    );
  });

  it('checks `deletePhotoRemote` instance method', () => {
    instance.deletePhotoRemote('1')();

    expect(props.store.dispatch).toHaveBeenCalledTimes(1);
    expect(props.store.dispatch).toHaveBeenCalledWith(
      deleteCamperPhoto('1'),
    );
  });

  describe('checks `deletePhoto` instance method', () => {
    it('for local image', () => {
      const img = {
        id: 1,
        file: { id: 2 },
      };

      jest.spyOn(instance, 'deletePhotoLocal').mockReturnValueOnce('deletePhotoLocal');

      instance.deletePhoto(img)();

      expect(props.store.dispatch).toHaveBeenCalledTimes(1);
      expect(props.store.dispatch).toHaveBeenCalledWith(
        showModal({
          modalType: 'REMOVE_SIGNATURE_MODAL',
          modalProps: {
            id: img.id,
            title: fakeIntl.formatMessage({ id: 'addNewCamper.form.photos.modal.title' }),
            subTitle: fakeIntl.formatMessage({ id: 'addNewCamper.form.photos.modal.subTitle' }),
            cancel: instance.props.hideModal,
            remove: 'deletePhotoLocal',
          },
        }),
      );
    });

    it('for remote image', () => {
      const img = {
        id: 1,
      };

      jest.spyOn(instance, 'deletePhotoRemote').mockReturnValueOnce('deletePhotoRemote');

      instance.deletePhoto(img)();

      expect(props.store.dispatch).toHaveBeenCalledTimes(1);
      expect(props.store.dispatch).toHaveBeenCalledWith(
        showModal({
          modalType: 'REMOVE_SIGNATURE_MODAL',
          modalProps: {
            id: img.id,
            title: fakeIntl.formatMessage({ id: 'addNewCamper.form.photos.modal.title' }),
            subTitle: fakeIntl.formatMessage({ id: 'addNewCamper.form.photos.modal.subTitle' }),
            cancel: instance.props.hideModal,
            remove: 'deletePhotoRemote',
          },
        }),
      );
    });
  });

  describe('checks `uploadPhotos` instance method', () => {
    it('when dropzoneRef does not exist', () => {
      const res = instance.uploadPhotos();

      expect(res).toBe(false);
    });

    it('when dropzoneRef exists', () => {
      instance.dropzoneRef.current = {
        open: jest.fn(),
      };

      const res = instance.uploadPhotos();

      expect(instance.dropzoneRef.current.open).toHaveBeenCalled();
      expect(res).toBe(true);
    });
  });

  describe('checks `checkUploadButtonPosition` instance method', () => {
    it('when sort container exists without children', () => {
      const wrapper = document.createElement('div');
      wrapper.id = 'camper-photo__sortable-section';
      document.body.appendChild(wrapper);

      const sortSection = instance.checkUploadButtonPosition();

      expect(sortSection).toMatchSnapshot();
    });

    it('when sort container exists with children', () => {
      const wrapper = document.getElementById('camper-photo__sortable-section');
      wrapper.innerHTML = '<div id="camper-photo__upload-button" />1</div><div id="test">2</div>';

      const sortSection = instance.checkUploadButtonPosition();

      expect(sortSection).toMatchSnapshot();
    });
  });

  it('checks `checkMainButtonVisibility` instance method', () => {
    const wrapper = document.getElementById('camper-photo__sortable-section');
    wrapper.innerHTML = `
      <div 
        id="a7fdb017-edaa-460a-9080-9ae188fcb29e" 
        class="camper-photo__uploaded-item">
          <div class="camper-photo__delete-icon-wrapper" role="button"></div>
          <div class="camper-photo__main-label">Main</div>
      </div>
      <div 
        id="651a8073-50c9-4d5a-ad55-9c1e1f8e872e" 
        class="camper-photo__uploaded-item">
        <img src="..." alt="" class="camper-photo__uploaded-image" srl_elementid="1">
        <div class="camper-photo__delete-icon-wrapper" role="button"></div>
        <div class="camper-photo__main-label">Main</div>
      </div>
      <div 
        id="camper-photo__upload-button" 
        role="button" 
        class="camper-photo__upload-button">
        <div class="camper-photo__upload-inner-wrapper">
          <div class="camper-photo__upload-text">Upload Image</div>
        </div>
      </div>
    `;

    const sortSection = instance.checkMainButtonVisibility();

    expect(sortSection).toMatchSnapshot();
  });

  describe('checks `onDropRejected` instance method', () => {
    it('when was rejected due to count', () => {
      const errorList = [
        { errors: [{ code: 'too-many-files' }] },
      ];

      const res = instance.onDropRejected(errorList);

      expect(store.dispatch).toHaveBeenCalledWith(showModal({
        modalType: 'INFO_MODAL',
        modalProps: {
          title: fakeIntl.formatMessage({ id: 'shared.error' }),
          subTitle: fakeIntl.formatMessage({ id: 'addNewCamper.photo.tooManyFiles' }),
          iconType: INFO_MODAL_ICON_TYPE.ERROR,
        },
      }));

      expect(res).toBe(false);
    });

    it('when was rejected due to max size', () => {
      const errorList = [
        { errors: [{ code: 'file-too-large' }] },
      ];

      const res = instance.onDropRejected(errorList);

      expect(store.dispatch).toHaveBeenCalledWith(showModal({
        modalType: 'UPLOAD_ERROR_MODAL',
      }));

      expect(res).toBe(false);
    });

    it('when was rejected due to incorrect format', () => {
      const errorList = [
        { errors: [{ code: 'file-invalid-type' }] },
      ];

      const res = instance.onDropRejected(errorList);

      expect(store.dispatch).toHaveBeenCalledWith(showModal({
        modalType: 'UPLOAD_ERROR_MODAL',
      }));

      expect(res).toBe(false);
    });

    it('without errors', () => {
      const errorList = [
        { errors: [] },
      ];

      const res = instance.onDropRejected(errorList);

      expect(res).toBe(true);
    });

    it('when success scenario', () => {
      const errorList = [];

      const res = instance.onDropRejected(errorList);

      expect(res).toBe(true);
    });
  });

  it('checks `handleSubmit` instance method', () => {
    instance.handleSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(createBatchCamperPhotos({
      photos: mockedCamperPhotos,
      camperId: props.camperId,
      mainPhoto: props.router.query.main,
      order: [
        'a7fdb017-edaa-460a-9080-9ae188fcb29e',
        '651a8073-50c9-4d5a-ad55-9c1e1f8e872e',
      ],
    }));
  });

  describe('checks `componentDidUpdate` instance method', () => {
    it('should check main button position', () => {
      const prevProps = {
        camperPhotos: [],
        isSidebarVisible: true,
      };

      instance.componentDidUpdate(prevProps);

      expect(checkMainButtonVisibilitySpy).toHaveBeenCalled();
    });

    it('should not check main button position', () => {
      const prevProps = {
        camperPhotos: [{ id: 1 }, { id: 2 }],
        isSidebarVisible: true,
      };

      instance.componentDidUpdate(prevProps);

      expect(checkMainButtonVisibilitySpy).not.toHaveBeenCalled();
    });
  });

  describe('tests `onBackButtonClick` instance method', () => {
    it('when local photos exist', () => {
      camperPhotosSelector.mockReturnValueOnce([{ id: 1, file: true }]);

      ({ instance } = layoutContainer(props));

      instance.onBackButtonClick();

      expect(store.dispatch).toHaveBeenCalledWith(
        showModal({
          modalType: 'LEAVE_PAGE_MODAL',
          modalProps: {
            discard: instance.goBack,
            save: instance.saveAndGoBack,
          },
        }),
      );
    });

    it('when local photos do not exist', () => {
      camperPhotosSelector.mockReturnValueOnce([]);

      ({ instance } = layoutContainer(props));

      const goBackSpy = jest.spyOn(instance, 'goBack').mockImplementationOnce(() => jest.fn());

      store.dispatch.mockClear();

      instance.onBackButtonClick();

      expect(store.dispatch).not.toHaveBeenCalled();

      expect(goBackSpy).toHaveBeenCalled();
    });
  });

  it('tests `goBack` instance method', () => {
    instance.goBack();

    expect(props.router.push).toHaveBeenCalledWith(
      createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.LISTING_DETAILS.PATH, props.camperId),
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      hideModal(),
    );
  });

  it('tests `saveAndGoBack` instance method', () => {
    const handleSubmitSpy = jest.spyOn(instance, 'handleSubmit').mockImplementationOnce(() => jest.fn());

    instance.saveAndGoBack();

    const route = createRouteFromPathname(
      ROUTES.ADD_NEW_CAMPER.LISTING_DETAILS.PATH,
      props.camperId,
    );

    expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    expect(handleSubmitSpy).toHaveBeenCalledWith(route);
  });

  describe('tests `leavePagePrepare` instance method', () => {
    it('when unsaved photos are not exist', () => {
      instance.leavePagePrepare('test');

      expect(store.dispatch).not.toHaveBeenCalledWith();
      expect(props.router.push).toHaveBeenCalledWith('test');
    });

    it('when unsaved photos are not exist', () => {
      camperPhotosSelector.mockReturnValueOnce([
        {
          id: 2,
          mainPhoto: false,
          file: 'http://.../uploads/store/camperphoto',
          camper: {
            id: '0aebbaa8-5006-483b-962c-82fe01ed581f',
            status: 'draft',
          },
        },
      ]);

      ({ instance } = layoutContainer(props));

      jest.spyOn(instance, 'leavePage').mockImplementationOnce(() => 'leavePageSpy');
      jest.spyOn(instance, 'leavePage').mockImplementationOnce(() => 'leavePageSpy');

      instance.leavePagePrepare('test');

      expect(store.dispatch).toHaveBeenCalledWith(showModal({
        modalType: 'LEAVE_PAGE_MODAL',
        modalProps: {
          discard: 'leavePageSpy',
          save: 'leavePageSpy',
        },
      }));
      expect(props.router.push).not.toHaveBeenCalled();
    });
  });

  describe('tests `leavePage` instance method', () => {
    it('with saving', () => {
      const handleSubmitSpy = jest.spyOn(instance, 'handleSubmit');

      instance.leavePage(true, 'test')();

      expect(handleSubmitSpy).toHaveBeenCalledWith('test');

      expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    });

    it('without saving', () => {
      const handleSubmitSpy = jest.spyOn(instance, 'handleSubmit');

      instance.leavePage(false, 'test')();

      expect(handleSubmitSpy).not.toHaveBeenCalled();
      expect(redirect).toHaveBeenCalledWith('test');

      expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    });
  });
});
