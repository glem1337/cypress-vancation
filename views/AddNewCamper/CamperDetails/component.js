import { FormattedMessage } from 'react-intl';
import { Col, Divider, Form, Row } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

import AddNewCamperBtnForm from 'views/shared/AddNewCamperBtnForm';
import ProgressBar from 'views/shared/ProgressBar';

import GeneralForm from './GeneralForm';
import TechnicalDetailsForm from './TechnicalDetailsForm';
import EstimatedEarningCard from '../EstimatedEarningCard';

const CamperDetails = ({
  isFormValid,
  isSubmitting,
  handleSubmit,
  years,
  camperLength,
  vehicleTypes,
  vehicleMake,
  vehicleModel,
  builtCamper,
  handlerMake,
  camperCompleteness,
  estimateEarningState,
}) => (
  <>
    <div className="main-listing-container">
      <div className="mb-16 mb-md-24">
        <ProgressBar
          content={<FormattedMessage id="addNewCamper.ProgressBar" />}
          percent={camperCompleteness}
        />
      </div>
      <Form layout="vertical">
        <Row gutter={24}>
          <Col lg={16}>
            <h1 className="text-headline mb-8">
              <FormattedMessage id="addNewCamper.camperDetails.startWithYour" />
            </h1>
            <p className="mb-16">
              <FormattedMessage id="addNewCamper.camperDetails.camperOrRVIsMatch" />
            </p>
            <div className="text-subtitle">
              <FormattedMessage id="addNewCamper.camperDetails.general" />
            </div>
            <GeneralForm
              years={years}
              camperLength={camperLength}
              isSubmitting={isSubmitting}
              vehicleTypes={vehicleTypes}
              vehicleMake={vehicleMake}
              vehicleModel={vehicleModel}
              builtCamper={builtCamper}
              handlerMake={handlerMake}
            />
            <Divider />
            <div className="text-subtitle">
              <FormattedMessage id="addNewCamper.camperDetails.technicalDetails" />
            </div>
            <TechnicalDetailsForm
              isSubmitting={isSubmitting}
              estimateEarningState={estimateEarningState}
            />
          </Col>
          <Col span={0} lg={8}>
            <EstimatedEarningCard />
          </Col>
        </Row>
      </Form>
    </div>
    <AddNewCamperBtnForm
      onSaveClick={handleSubmit}
      canSave={isFormValid && !isSubmitting}
      isSubmitting={isSubmitting}
      showGradientButton={isFormValid && !isSubmitting}
    />
  </>
);

CamperDetails.defaultProps = {
  years: [],
  camperLength: [],
  vehicleTypes: [],
  vehicleMake: [],
  vehicleModel: [],
  builtCamper: [],
  isSubmitting: false,
};

CamperDetails.propTypes = {
  isFormValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  handlerMake: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(PropTypes.shape()),
  camperLength: PropTypes.arrayOf(PropTypes.shape()),
  vehicleTypes: PropTypes.arrayOf(PropTypes.shape()),
  vehicleMake: PropTypes.arrayOf(PropTypes.shape()),
  vehicleModel: PropTypes.arrayOf(PropTypes.shape()),
  builtCamper: PropTypes.arrayOf(PropTypes.shape()),
  camperCompleteness: PropTypes.number.isRequired,
  estimateEarningState: PropTypes.bool.isRequired,
};

export default CamperDetails;
