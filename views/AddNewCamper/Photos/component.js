import { FormattedMessage } from 'react-intl';
import { Col, Row, Skeleton } from 'antd';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { SRLWrapper } from 'simple-react-lightbox';

import { FORM_VALIDATION } from 'constants/camper';
import { LIGHTBOX_OPTIONS } from 'constants/camperPhotos';
import AddNewCamperBtnForm from 'views/shared/AddNewCamperBtnForm';
import ProgressBar from 'views/shared/ProgressBar';

import Photo from './Photo';
import UploadButton from './UploadButton';
import EstimatedEarningCard from '../EstimatedEarningCard';

const ListingPhotos = ({
  handleSubmit,
  onBackButtonClick,
  isLoading,
  dropzoneRef,
  onDropHandler,
  deletePhoto,
  photos,
  uploadPhotos,
  onDropRejected,
  isCamperExist,
  camperCompleteness,
}) => {
  if (!isCamperExist) {
    return (
      <div className="main-listing-container">
        <div className="mb-16 mb-md-24">
          <ProgressBar
            content={<FormattedMessage id="addNewCamper.ProgressBar" />}
            percent={camperCompleteness}
          />
        </div>
        <Row>
          <Col span={24}>
            <Skeleton active />
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <Dropzone
      noClick
      noKeyboard
      ref={dropzoneRef}
      multiple
      maxFiles={FORM_VALIDATION.MAX_PHOTOS_COUNT}
      maxSize={FORM_VALIDATION.MAX_PHOTOS_SIZE}
      accept={FORM_VALIDATION.IMAGE_TYPES}
      onDrop={onDropHandler}
      onDropRejected={onDropRejected}
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps({ className: 'camper-photo__dropzone-container' })}>
          <input {...getInputProps()} />
          <div className="main-listing-container">
            <div className="mb-16 mb-md-24">
              <ProgressBar
                content={<FormattedMessage id="addNewCamper.ProgressBar" />}
                percent={camperCompleteness}
              />
            </div>
            <Row>
              <Col span={24}>
                <h1 className="text-headline mb-8">
                  <FormattedMessage id="addNewCamper.form.photos.title" />
                </h1>
                <p className="mb-24">
                  <FormattedMessage id="addNewCamper.form.photos.subTitle" />
                </p>
              </Col>
            </Row>
            <div className="camper-photo__lightbox-wrapper">
              <SRLWrapper options={LIGHTBOX_OPTIONS}>
                <div
                  id="camper-photo__sortable-section"
                  className="camper-photo__sortable-section"
                >
                  {photos.map((img) => (
                    <Photo
                      id={img.id}
                      key={img.id}
                      photo={img.photo}
                      deletePhoto={deletePhoto(img)}
                    />
                ))}
                  <UploadButton
                    uploadPhotos={uploadPhotos}
                    disabled={photos.length >= FORM_VALIDATION.MAX_PHOTOS_COUNT}
                  />
                </div>
              </SRLWrapper>
              <EstimatedEarningCard isSlim />
            </div>
          </div>
          <AddNewCamperBtnForm
            withBackBtn
            canSave={!isLoading}
            onSaveClick={handleSubmit}
            onBackClick={onBackButtonClick}
          />
        </div>
      )}
    </Dropzone>
  );
};

ListingPhotos.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  dropzoneRef: PropTypes.shape().isRequired,
  onDropHandler: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  uploadPhotos: PropTypes.func.isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onDropRejected: PropTypes.func.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  camperCompleteness: PropTypes.number.isRequired,
};

ListingPhotos.defaultProps = {
  isLoading: false,
};

export default ListingPhotos;
