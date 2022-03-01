import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import * as R from 'ramda';
import Sortable from 'sortablejs';
import { v4 as uuid } from 'uuid';
import { injectIntl } from 'react-intl';
import deepEqual from 'fast-deep-equal';

import attachLayout from 'views/layouts/attachLayout';
import AddNewCamperLayout from 'views/layouts/AddNewCamper';
import { showMessage as showMessageAction } from 'state/flash-messages/actions';
import {
  showModal as showModalAction,
  hideModal as hideModalAction,
} from 'state/modal/actions';
import ROUTES from 'constants/routes';
import { FORM_VALIDATION } from 'constants/camper';
import {
  createNameAndDescription,
  createBatchCamperPhotos as createBatchCamperPhotosAction,
  deleteCamperPhoto as deleteCamperPhotoAction,
  checkPreviousStepCompleteness,
  fetchCamper,
  setLeavePageMethod as setLeavePageMethodAction,
} from 'state/concepts/camper/actions';
import {
  camperPhotosSelector,
  isCamperExistSelector,
  camperCompletenessSelector,
} from 'state/concepts/camper/selectors';
import {
  dataApiSuccess as dataApiSuccessAction,
  dataDelete as dataDeleteAction,
  dataDeleteEntity,
} from 'state/data/actions';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import isPresent from 'utils/isPresent';
import { loadingSelector } from 'state/data/selectors';
import { addCamperPhotosEndpoint } from 'state/concepts/camper/endpoints';
import { INFO_MODAL_ICON_TYPE } from 'views/shared/InfoModal/types';
import redirect from 'utils/redirect';

import CamperPhotosComponent from './component';

class ListingPhotos extends React.PureComponent {
  dropzoneRef = React.createRef();

  static propTypes = {
    router: PropTypes.shape().isRequired,
    createBatchCamperPhotos: PropTypes.func.isRequired,
    camperId: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    intl: PropTypes.shape().isRequired,
    deleteCamperPhoto: PropTypes.func.isRequired,
    dataApiSuccess: PropTypes.func.isRequired,
    camperPhotos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    dataDelete: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    showMessage: PropTypes.func.isRequired,
    isCamperExist: PropTypes.bool.isRequired,
    setLeavePageMethod: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isLoading: false,
  }

  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper_id;

    ctx.store.dispatch(dataDeleteEntity({ kind: 'camperPhoto' }));

    ctx.store.dispatch(fetchCamper(camperId, 'camper_photos'));

    await ctx.store.logicMiddleware.whenComplete();

    ctx.store.dispatch(checkPreviousStepCompleteness({
      key: ROUTES.ADD_NEW_CAMPER.LISTING_PHOTOS.KEY,
      camperId,
      ctx,
    }));

    return { camperId };
  }

  constructor(props) {
    super(props);

    props.setLeavePageMethod(this.leavePagePrepare);
  }

  componentDidMount() {
    const { isCamperExist } = this.props;

    if (!isCamperExist) {
      return;
    }

    // Configure sort
    const container = document.getElementById('camper-photo__sortable-section');
    this.sortable = Sortable.create(container, {
      draggable: '.camper-photo__uploaded-item',
      onChange: this.onOrderChange,
    });

    this.checkMainButtonVisibility();
  }

  componentDidUpdate(prevProps) {
    const { camperPhotos } = this.props;

    if (
      !deepEqual(
        camperPhotos.map(item => item.id),
        prevProps.camperPhotos.map(item => item.id),
      )
    ) {
      this.checkMainButtonVisibility();
    }
  }

  /**
   * When sort order was changed
   */
  onOrderChange = () => {
    this.checkUploadButtonPosition();
    this.checkMainButtonVisibility();
  }

  /**
   * Go back
   */
  goBack = () => {
    const {
      router,
      camperId,
      hideModal,
    } = this.props;

    const route = createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.LISTING_DETAILS.PATH, camperId);

    router.push(route);

    hideModal();
  }

  /**
   * Save and go back
   */
  saveAndGoBack = () => {
    const {
      camperId,
      hideModal,
    } = this.props;

    const redirectRoute = createRouteFromPathname(
      ROUTES.ADD_NEW_CAMPER.LISTING_DETAILS.PATH,
      camperId,
    );

    hideModal();

    this.handleSubmit(redirectRoute);
  }

  /**
   * Click on back button
   */
  onBackButtonClick = () => {
    const { showModal, camperPhotos } = this.props;

    const isNotSaved = R.any(item => !R.isNil(item?.file))(camperPhotos);

    if (isNotSaved) {
      showModal({
        modalType: 'LEAVE_PAGE_MODAL',
        modalProps: {
          discard: this.goBack,
          save: this.saveAndGoBack,
        },
      });

      return;
    }

    this.goBack();
  }

  /**
   * Click on close button
   */
  leavePagePrepare = (redirectRoute) => {
    const { showModal, camperPhotos, router } = this.props;

    const isNotSaved = R.any(item => !R.isNil(item?.file))(camperPhotos);

    if (isNotSaved) {
      showModal({
        modalType: 'LEAVE_PAGE_MODAL',
        modalProps: {
          discard: this.leavePage(false, redirectRoute),
          save: this.leavePage(true, redirectRoute),
        },
      });

      return;
    }

    router.push(redirectRoute);
  }

  /**
   * Leave page
   */
  leavePage = (withSaving, redirectRoute) => () => {
    const { hideModal } = this.props;

    if (withSaving) {
      this.handleSubmit(redirectRoute);
    } else {
      redirect(redirectRoute);
    }

    hideModal();
  }

  /**
   * Show max count modal
   */
  showMaxCountModal = () => {
    const {
      camperPhotos,
      showModal,
      intl: { formatMessage },
    } = this.props;

    const difference = FORM_VALIDATION.MAX_PHOTOS_COUNT - camperPhotos.length;

    showModal({
      modalType: 'INFO_MODAL',
      modalProps: {
        title: formatMessage({ id: 'shared.error' }),
        subTitle: formatMessage({ id: 'addNewCamper.photo.tooManyFilesFixed' }, { difference }),
        iconType: INFO_MODAL_ICON_TYPE.ERROR,
      },
    });

    return difference;
  }

  /**
   * On drop handler
   */
  onDropHandler = (acceptedFiles) => {
    const { dataApiSuccess, camperId, camperPhotos } = this.props;

    const count = camperPhotos.length + acceptedFiles.length;
    if (count > FORM_VALIDATION.MAX_PHOTOS_COUNT) {
      this.showMaxCountModal();
      return false;
    }

    const camperPhoto = acceptedFiles
      .map((item, index) => ({
        id: uuid(),
        type: 'camperPhoto',
        attributes: {
          camperId,
          mainPhoto: false,
          photo: URL.createObjectURL(item),
          file: item,
          position: camperPhotos.length + 1 + index,
        },
      }))
      .reduce((acc, item) => { acc[item.id] = item; return acc; }, {});

    dataApiSuccess({ response: { camperPhoto } });

    this.checkMainButtonVisibility();

    return camperPhoto;
  }

  /**
   * Delete local photo
   */
  deletePhotoLocal = (id) => () => {
    const { dataDelete, hideModal } = this.props;

    dataDelete({
      kind: 'camperPhoto',
      ids: [id],
    });

    hideModal();
  }

  /**
   * Delete remote photo
   */
  deletePhotoRemote = (id) => () => {
    const { deleteCamperPhoto } = this.props;

    deleteCamperPhoto(id);
  }

  /**
   * Delete photo
   */
  deletePhoto = (img) => () => {
    const {
      showModal,
      intl: { formatMessage },
      hideModal,
    } = this.props;

    const remove = isPresent(img.file)
      ? this.deletePhotoLocal(img.id)
      : this.deletePhotoRemote(img.id);

    showModal({
      modalType: 'REMOVE_SIGNATURE_MODAL',
      modalProps: {
        id: img.id,
        title: formatMessage({ id: 'addNewCamper.form.photos.modal.title' }),
        subTitle: formatMessage({ id: 'addNewCamper.form.photos.modal.subTitle' }),
        cancel: hideModal,
        remove,
      },
    });
  }

  /**
   * Upload Photos
   */
  uploadPhotos = () => {
    const { camperPhotos } = this.props;

    if (!this.dropzoneRef.current || camperPhotos.length >= FORM_VALIDATION.MAX_PHOTOS_COUNT) {
      return false;
    }

    this.dropzoneRef.current.open();

    return true;
  }

  /**
   * Check Upload Button Position
   */
  checkUploadButtonPosition = () => {
    const sortSection = document.getElementById('camper-photo__sortable-section');

    const { length } = sortSection.children;

    const lastElement = sortSection.children[length - 1];

    if (lastElement && lastElement.id !== 'camper-photo__upload-button') {
      const uploadButton = document.getElementById('camper-photo__upload-button');

      uploadButton.parentNode.removeChild(uploadButton);
      sortSection.appendChild(uploadButton);
    }

    return sortSection;
  }

  /**
   * Check main button visibility
   */
  checkMainButtonVisibility = () => {
    const sortSection = document.getElementById('camper-photo__sortable-section');

    for (let i = 0; i < sortSection.children.length; i += 1) {
      const elem = sortSection.children[i];
      const mainButton = elem.querySelector('.camper-photo__main-label');

      if (!mainButton) {
        // eslint-disable-next-line no-continue
        continue;
      }

      mainButton.classList.remove('camper-photo__main-label--visible');

      if (i === 0) {
        mainButton.classList.add('camper-photo__main-label--visible');
      }
    }

    return sortSection;
  }

  /**
   * When dropzone rejected upload
   */
  onDropRejected = (files) => {
    const { showModal, intl: { formatMessage } } = this.props;

    const TOO_MANY_FILES_CODE = 'too-many-files';
    const FILE_TOO_LARGE = 'file-too-large';
    const FILE_INVALID_TYPE = 'file-invalid-type';

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];

      const errorCode = R.path(['errors', '0', 'code'], file);

      if (!errorCode) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (errorCode === TOO_MANY_FILES_CODE) {
        showModal({
          modalType: 'INFO_MODAL',
          modalProps: {
            title: formatMessage({ id: 'shared.error' }),
            subTitle: formatMessage({ id: 'addNewCamper.photo.tooManyFiles' }),
            iconType: INFO_MODAL_ICON_TYPE.ERROR,
          },
        });

        return false;
      }

      if (errorCode === FILE_TOO_LARGE) {
        showModal({
          modalType: 'UPLOAD_ERROR_MODAL',
        });

        return false;
      }

      if (errorCode === FILE_INVALID_TYPE) {
        showModal({
          modalType: 'UPLOAD_ERROR_MODAL',
        });

        return false;
      }
    }

    return true;
  };

  /**
   * Handle submit
   */
  handleSubmit = (redirectRoute) => {
    const {
      createBatchCamperPhotos,
      camperId,
      camperPhotos,
      router: { query: { main } },
    } = this.props;

    let order = [];
    const sortSection = document.getElementById('camper-photo__sortable-section');
    for (let i = 0; i < sortSection.children.length; i += 1) {
      const elem = sortSection.children[i];

      if (elem.id === 'camper-photo__upload-button') {
        // eslint-disable-next-line no-continue
        continue;
      }

      order = [...order, elem.id];
    }

    createBatchCamperPhotos({
      photos: camperPhotos,
      camperId,
      mainPhoto: main,
      order,
      redirectRoute: typeof redirectRoute === 'string' ? redirectRoute : undefined,
    });
  }

  render = () => {
    const { camperPhotos } = this.props;

    return (
      <CamperPhotosComponent
        {...this.props}
        photos={camperPhotos}
        onBackButtonClick={this.onBackButtonClick}
        dropzoneRef={this.dropzoneRef}
        uploadPhotos={this.uploadPhotos}
        onDropHandler={this.onDropHandler}
        changeOrder={this.changeOrder}
        deletePhoto={this.deletePhoto}
        onDropRejected={this.onDropRejected}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
  camperCompleteness: camperCompletenessSelector(state, ownProps?.camperId),
  camperPhotos: camperPhotosSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(state, addCamperPhotosEndpoint.endpoint),
});

const mapDispatchToProps = {
  onSubmit: createNameAndDescription,
  createBatchCamperPhotos: createBatchCamperPhotosAction,
  showModal: showModalAction,
  hideModal: hideModalAction,
  deleteCamperPhoto: deleteCamperPhotoAction,
  dataApiSuccess: dataApiSuccessAction,
  dataDelete: dataDeleteAction,
  showMessage: showMessageAction,
  setLeavePageMethod: setLeavePageMethodAction,
};

export { ListingPhotos as ListingPhotosContainer };
export default R.compose(
  attachLayout(AddNewCamperLayout),
  withRouter,
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
)(ListingPhotos);
