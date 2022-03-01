import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
 Alert, Col, Form, Input, Row, Skeleton,
} from 'antd';

import ProgressBar from 'views/shared/ProgressBar';
import AddNewCamperBtnForm from 'views/shared/AddNewCamperBtnForm';
import InsuranceList from 'views/shared/InsuranceList';
import EstimatedEarningCard from '../EstimatedEarningCard';

const Insurance = ({
  onBackButtonClick,
  onSaveButtonClick,
  camperCompleteness,
  isCamperExist,
  isLoading,
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
        <Row gutter={24}>
          <Skeleton active />
        </Row>
      </div>
    );
  }

  return (
    <>
      <div className="main-listing-container">
        <div className="mb-16 mb-md-24">
          <ProgressBar
            content={<FormattedMessage id="addNewCamper.ProgressBar" />}
            percent={camperCompleteness}
          />
        </div>
        <Row gutter={24}>
          <Col lg={16}>
            <h1 className="text-headline mb-16">
              <FormattedMessage id="addNewCamper.insurance.title" />
            </h1>
            <Alert
              type="info"
              className="mb-24"
              showIcon
              icon={<i className="icon icon-info" />}
              message={<FormattedMessage id="addNewCamper.insurance.subTitle" />}
            />
          </Col>
          <Col lg={12}>
            <div className="main-listing__insurance mb-16">
              <h2 className="text-subheader font-400 mb-16">
                <FormattedMessage id="addNewCamper.insurance.package.title" />
              </h2>
              <InsuranceList />
            </div>
          </Col>
          <Col lg={16}>
            <Alert
              type="warning"
              className="mb-24"
              showIcon
              icon={<i className="icon icon-idea" />}
              message={
                <FormattedMessage id="addNewCamper.insurance.verification" />
              }
            />
          </Col>
          <Col lg={16}>
            <h3 className="text-subheader font-700 mb-8">
              <FormattedMessage id="addNewCamper.insurance.refundable.title" />
            </h3>
            <p className="mb-16">
              <FormattedMessage id="addNewCamper.insurance.refundable.subTitle" />
            </p>
          </Col>
          <div className="w-100" />
          <Col md={12} lg={8}>
            <Form layout="vertical">
              <Form.Item
                label={(
                  <span className="main-input__label">
                    <FormattedMessage id="addNewCamper.insurance.depositAmountLabel" />
                  </span>
                )}
                help={(
                  <div className="main-input__message">
                    <i className="main-input__message-icon icon icon-info" />
                    <FormattedMessage
                      id="addNewCamper.insurance.depositAmountHelper"
                      values={{ price: '$3000' }}
                    />
                  </div>
                )}
              >
                <Input value="$3,000" />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <EstimatedEarningCard isSlim />
      </div>
      <AddNewCamperBtnForm
        onBackClick={onBackButtonClick}
        onSaveClick={onSaveButtonClick}
        withBackBtn
        canSave={!isLoading}
        isSubmitting={isLoading}
      />
    </>
  );
};

Insurance.propTypes = {
  onBackButtonClick: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  camperCompleteness: PropTypes.number.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Insurance;
