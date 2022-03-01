import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
 Col, Row, Form, Divider, Skeleton,
} from 'antd';

import EditCamperLayout from 'views/layouts/EditCamper';

import Documents from './Documents';
import Questions from './Questions';

const AdditionalDocuments = ({
  isCamperExist,
  isValid,
  isLoading,
  handleSubmit,
  onRemoveDocuments,
  validateDocuments,
  onAddQuestion,
  onRemoveQuestion,
  leavePagePrepare,
  values: { documents, questions },
}) => (
  <EditCamperLayout
    hasFooter
    canSave={isValid && !isLoading}
    onSave={handleSubmit}
    isLoading={isLoading}
    leavePageMethod={leavePagePrepare}
  >
    <div className="container">
      {isCamperExist ? (
        <Form layout="vertical">
          <Row>
            <Col lg={16}>
              <h2 className="text-headline mb-8">
                <FormattedMessage id="dashboard.editCamper.documents.title" />
              </h2>
              <p className="mb-24">
                <FormattedMessage id="dashboard.editCamper.documents.description" />
              </p>
            </Col>
            <Col lg={16}>
              <Documents
                onRemove={onRemoveDocuments}
                validateFiles={validateDocuments}
                documents={documents}
              />
            </Col>
            <Col span={24}>
              <Divider className="mt-24 mb-24" />
            </Col>
            <Col lg={16}>
              <Questions
                onRemove={onRemoveQuestion}
                onAdd={onAddQuestion}
                questions={questions}
              />
            </Col>
          </Row>
        </Form>
      ) : (
        <Skeleton active />
      )}
    </div>
  </EditCamperLayout>
);

AdditionalDocuments.defaultProps = {
  isLoading: false,
};

AdditionalDocuments.propTypes = {
  isCamperExist: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  onRemoveDocuments: PropTypes.func.isRequired,
  validateDocuments: PropTypes.func.isRequired,
  onAddQuestion: PropTypes.func.isRequired,
  onRemoveQuestion: PropTypes.func.isRequired,
  leavePagePrepare: PropTypes.func.isRequired,
  values: PropTypes.shape().isRequired,
};

export default AdditionalDocuments;
