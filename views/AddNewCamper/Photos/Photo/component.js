import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DeleteOutlined } from '@ant-design/icons';

const Photo = ({ id, photo, deletePhoto }) => (
  <div
    id={id}
    key={id}
    className="camper-photo__uploaded-item"
  >
    <img src={photo} alt="" className="camper-photo__uploaded-image" />
    <div
      className="camper-photo__delete-icon-wrapper"
      onClick={deletePhoto}
      role="button"
    >
      <DeleteOutlined className="camper-photo__delete-icon" />
    </div>
    <div className="camper-photo__main-label">
      <FormattedMessage id="shared.main" />
    </div>
  </div>
);

Photo.propTypes = {
  id: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  deletePhoto: PropTypes.func.isRequired,
};

export default Photo;
