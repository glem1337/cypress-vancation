import { FormattedMessage } from 'react-intl';
import {
 Col, Row, Form, Divider, Skeleton,
} from 'antd';

import PropTypes from 'prop-types';

import ProgressBar from 'views/shared/ProgressBar';
import AddNewCamperBtnForm from 'views/shared/AddNewCamperBtnForm';

import GeneratorSection from './GeneratorSection';
import MileageSection from './MileageSection';
import CleaningsSection from './CleaningsSection';
import CustomFeesSection from './CustomFeesSection';
import EstimatedEarningCard from '../EstimatedEarningCard/container';

const TripFeesComponent = ({
  values,
  onMilesModeChange,
  handleSubmit,
  onBackButtonClick,
  onGeneratorExistenceChange,
  onGeneratorModeChange,
  addCustomFee,
  removeCustomFee,
  onFrequencyChanged,
  isLoading,
  isCamperExist,
  camperCompleteness,
}) => {
  const {
    generator,
    mileage,
    customFees,
    cleaningAndPreparationFee,
  } = values;

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
    <>
      <div className="main-listing-container">
        <div className="mb-16 mb-md-24">
          <ProgressBar
            content={<FormattedMessage id="addNewCamper.ProgressBar" />}
            percent={camperCompleteness}
          />
        </div>
        <Form layout="vertical">
          <CleaningsSection cleaningAndPreparationFee={cleaningAndPreparationFee} />
          <Divider className="mt-24" />
          <Row>
            <Col span={24}>
              <MileageSection
                onMilesModeChange={onMilesModeChange}
                mode={mileage.mode}
              />
            </Col>
          </Row>
          <Divider className="mt-24" />
          <Row>
            <Col span={24}>
              <GeneratorSection
                hasGenerator={generator.hasGenerator}
                onGeneratorExistenceChange={onGeneratorExistenceChange}
                mode={generator.mode}
                onGeneratorModeChange={onGeneratorModeChange}
              />
            </Col>
          </Row>
          <Divider className="mt-24" />
          <CustomFeesSection
            addCustomFee={addCustomFee}
            customFees={Object.values(customFees)}
            removeCustomFee={removeCustomFee}
            onFrequencyChanged={onFrequencyChanged}
          />
        </Form>
        <EstimatedEarningCard isSlim />
      </div>
      <AddNewCamperBtnForm
        withBackBtn
        canSave={!isLoading}
        onSaveClick={handleSubmit}
        onBackClick={onBackButtonClick}
        isSubmitting={isLoading}
      />
    </>
  );
};

TripFeesComponent.propTypes = {
  values: PropTypes.shape().isRequired,
  onMilesModeChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  onGeneratorExistenceChange: PropTypes.func.isRequired,
  onGeneratorModeChange: PropTypes.func.isRequired,
  addCustomFee: PropTypes.func.isRequired,
  removeCustomFee: PropTypes.func.isRequired,
  onFrequencyChanged: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  camperCompleteness: PropTypes.number.isRequired,
};

export default TripFeesComponent;
