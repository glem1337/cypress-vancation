import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';

const UploadButton = ({ uploadPhotos, disabled }) => (
  <div
    id="camper-photo__upload-button"
    onClick={uploadPhotos}
    role="button"
    className={classnames('camper-photo__upload-button', {
      'camper-photo__upload-button--disabled': disabled,
    })}
  >
    <div className="camper-photo__upload-inner-wrapper">
      <i className="icon icon-upload" />
      <div className="camper-photo__upload-text">
        <FormattedMessage id="addNewCamper.form.photos.uploadImage" />
      </div>
    </div>
  </div>
);

UploadButton.propTypes = {
  uploadPhotos: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default UploadButton;
