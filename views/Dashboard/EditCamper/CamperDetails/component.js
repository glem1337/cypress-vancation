import { FormattedMessage } from 'react-intl';
import {
 Col, Divider, Row, Form, Skeleton,
} from 'antd';
import PropTypes from 'prop-types';

import EditCamperLayout from 'views/layouts/EditCamper';
import GeneralForm from 'views/AddNewCamper/CamperDetails/GeneralForm';
import TechnicalDetailsForm from 'views/AddNewCamper/CamperDetails/TechnicalDetailsForm';
import WaterForm from './WaterForm';

const CamperDetails = ({
  isFormValid,
  isLoading,
  handleSubmit,
  years,
  camperLength,
  vehicleTypes,
  vehicleMake,
  vehicleModel,
  builtCamper,
  handlerMake,
  isCamperExist,
  leavePagePrepare,
  intl: { formatMessage },
}) => (
  <EditCamperLayout
    hasFooter
    canSave={isFormValid && !isLoading}
    onSave={handleSubmit}
    isLoading={isLoading}
    leavePageMethod={leavePagePrepare}
  >
    <div className="container">
      <Row>
        <Col lg={16}>
          <Row gutter={24}>
            <Col span={24}>
              <h1 className="text-headline mb-8">
                <FormattedMessage id="addNewCamper.camperDetails.startWithYour" />
              </h1>
              <p className="mb-16">
                <FormattedMessage id="addNewCamper.camperDetails.camperOrRVIsMatch" />
              </p>
            </Col>
          </Row>
        </Col>
        {isCamperExist ? (
          <Form layout="vertical">
            <Col lg={16}>
              <Row gutter={24}>
                <Col span={24}>
                  <GeneralForm
                    years={years}
                    camperLength={camperLength}
                    isSubmitting={isLoading}
                    vehicleTypes={vehicleTypes}
                    vehicleMake={vehicleMake}
                    vehicleModel={vehicleModel}
                    builtCamper={builtCamper}
                    handlerMake={handlerMake}
                  />
                </Col>
              </Row>
            </Col>
            <Divider />
            <Col lg={16}>
              <Row gutter={24}>
                <Col span={24}>
                  <div className="text-subtitle">
                    <FormattedMessage id="addNewCamper.camperDetails.technicalDetails" />
                  </div>
                  <TechnicalDetailsForm
                    isSubmitting={isLoading}
                    estimateEarningState={false}
                  />
                </Col>
              </Row>
            </Col>
            <Divider />
            <Col lg={16}>
              <Row gutter={24}>
                <Col span={24}>
                  <div className="text-subtitle">
                    <FormattedMessage id="addNewCamper.camperDetails.water.title" />
                  </div>
                  <WaterForm formatMessage={formatMessage} isSubmitting={isLoading} />
                </Col>
              </Row>
            </Col>
          </Form>
        ) : (
          <Skeleton active />
        )}
      </Row>
    </div>
  </EditCamperLayout>
);

CamperDetails.defaultProps = {
  years: [],
  camperLength: [],
  vehicleTypes: [],
  vehicleMake: [],
  vehicleModel: [],
  builtCamper: [],
};

CamperDetails.propTypes = {
  isFormValid: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handlerMake: PropTypes.func.isRequired,
  leavePagePrepare: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(PropTypes.shape()),
  camperLength: PropTypes.arrayOf(PropTypes.shape()),
  vehicleTypes: PropTypes.arrayOf(PropTypes.shape()),
  vehicleMake: PropTypes.arrayOf(PropTypes.shape()),
  vehicleModel: PropTypes.arrayOf(PropTypes.shape()),
  builtCamper: PropTypes.arrayOf(PropTypes.shape()),
  isCamperExist: PropTypes.bool.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default CamperDetails;
