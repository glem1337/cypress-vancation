import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
 Alert, Col, Form, Row, Skeleton, Divider,
} from 'antd';
import classnames from 'classnames';

import { INSURANCE_STATUS } from 'constants/camperInsurance';

import EditCamperLayout from 'views/layouts/EditCamper';
import InsuranceList from 'views/shared/InsuranceList';

import ActualCashValueSection from './ActualCashValueSection';
import VehicleInfoSection from './VehicleInfoSection';

const Insurance = ({
  handleSubmit,
  isCamperExist,
  isLoading,
  insuranceStatus,
  values,
  leavePagePrepare,
  canSave,
}) => (
  <EditCamperLayout
    hasFooter
    canSave={canSave}
    showGradientButton={canSave}
    onSave={handleSubmit}
    isLoading={isLoading}
    leavePageMethod={leavePagePrepare}
  >
    <div className="container">
      <Form layout="vertical">
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
              message={
                <FormattedMessage id="addNewCamper.insurance.subTitle" />
              }
            />
          </Col>
          {isCamperExist ? (
            <>
              <Col lg={12}>
                <div className="main-listing__insurance mb-16">
                  <div className="main-listing__insurance-badge">
                    <i
                      className={classnames('icon in-green-1000 mr-8', {
                        'icon-checked':
                          insuranceStatus === INSURANCE_STATUS.APPROVED,
                        'icon-time':
                          insuranceStatus === INSURANCE_STATUS.PENDING,
                      })}
                    />
                    <span className="in-black">
                      <FormattedMessage
                        id={`addNewCamper.insurance.package.status.${insuranceStatus}`}
                      />
                    </span>
                  </div>
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
              <Divider className="mt-24 mb-24" />
              <ActualCashValueSection
                actualCashValue={values.actualCashValue}
              />
              <Divider className="mt-24 mb-24" />
              <VehicleInfoSection isLoading={isLoading} />
            </>
          ) : (
            <Skeleton active />
          )}
        </Row>
      </Form>
    </div>
  </EditCamperLayout>
);

Insurance.defaultProps = {
  isLoading: false,
};

Insurance.propTypes = {
  leavePagePrepare: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  canSave: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  insuranceStatus: PropTypes.string.isRequired,
  values: PropTypes.shape().isRequired,
};

export default Insurance;
