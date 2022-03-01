import { Button, Upload } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  DOCUMENTS_ACCEPT_FILES,
  DOCUMENTS_MAX_FILES_COUNT,
} from 'constants/dashboardAdditionalDocuments';

const Documents = ({ onRemove, validateFiles, documents }) => (
  <Upload
    accept={DOCUMENTS_ACCEPT_FILES}
    className="edit-listing-doc-upload"
    fileList={documents}
    onRemove={onRemove}
    onChange={validateFiles}
    showUploadList={{
      showRemoveIcon: true,
      removeIcon: <i className="icon icon-cross" />,
    }}
    multiple
  >
    <Button
      className="mt-8"
      type="secondary"
      disabled={documents.length === DOCUMENTS_MAX_FILES_COUNT}
    >
      <FormattedMessage id="dashboard.editCamper.documents.upload.btn" />
    </Button>
  </Upload>
);

Documents.propTypes = {
  onRemove: PropTypes.func.isRequired,
  validateFiles: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Documents;
