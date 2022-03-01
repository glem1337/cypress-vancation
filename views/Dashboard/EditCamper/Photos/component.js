import { FormattedMessage } from 'react-intl';
import { Col, Row, Skeleton } from 'antd';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { SRLWrapper } from 'simple-react-lightbox';

import { FORM_VALIDATION } from 'constants/camper';
import { LIGHTBOX_OPTIONS } from 'constants/camperPhotos';
import EditCamperLayout from 'views/layouts/EditCamper';

import Photo from 'views/AddNewCamper/Photos/Photo';
import UploadButton from 'views/AddNewCamper/Photos/UploadButton';

const ListingPhotos = ({
  handleSubmit,
  isLoading,
  dropzoneRef,
  onDropHandler,
  deletePhoto,
  photos,
  uploadPhotos,
  onDropRejected,
  isCamperExist,
  leavePagePrepare,
}) => (
  <EditCamperLayout
    canSave={!isLoading}
    isLoading={isLoading}
    onSave={handleSubmit}
    hasFooter
    leavePageMethod={leavePagePrepare}
  >
    <div className="container">
      <Row>
        <Col span={24} lg={16}>
          <h1 className="text-headline mb-8">
            <FormattedMessage id="addNewCamper.form.photos.title" />
          </h1>
          <p className="mb-24">
            <FormattedMessage id="addNewCamper.form.photos.subTitle" />
          </p>
        </Col>
        <Col span={24}>
          {isCamperExist ? (
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
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
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
                        disabled={
                          photos.length >= FORM_VALIDATION.MAX_PHOTOS_COUNT
                        }
                      />
                    </div>
                  </SRLWrapper>
                </div>
              )}
            </Dropzone>
          ) : (
            <Skeleton active />
          )}
        </Col>
      </Row>
    </div>
  </EditCamperLayout>
);

ListingPhotos.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  dropzoneRef: PropTypes.shape().isRequired,
  onDropHandler: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  uploadPhotos: PropTypes.func.isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onDropRejected: PropTypes.func.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  leavePagePrepare: PropTypes.func.isRequired,
};

ListingPhotos.defaultProps = {
  isLoading: false,
};

export default ListingPhotos;
