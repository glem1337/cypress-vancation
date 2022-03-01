import PropTypes from 'prop-types';
import {
 Col, Row, Form, Divider, Skeleton,
} from 'antd';

import EditCamperLayout from 'views/layouts/EditCamper';

import GeneratorSection from 'views/AddNewCamper/TripFees/GeneratorSection';
import MileageSection from 'views/AddNewCamper/TripFees/MileageSection';
import CleaningsSection from 'views/AddNewCamper/TripFees/CleaningsSection';
import CustomFeesSection from 'views/AddNewCamper/TripFees/CustomFeesSection';
import DumpingSection from './DumpingSection';

const TripFeesComponent = ({
  values,
  onMilesModeChange,
  handleSubmit,
  onGeneratorExistenceChange,
  onGeneratorModeChange,
  addCustomFee,
  removeCustomFee,
  onFrequencyChanged,
  isLoading,
  isCamperExist,
  leavePagePrepare,
  intl: { formatMessage },
}) => {
  const { generator, mileage, customFees, cleaningAndPreparationFee } = values;

  return (
    <EditCamperLayout
      hasFooter
      canSave={!isLoading}
      onSave={handleSubmit}
      isLoading={isLoading}
      leavePageMethod={leavePagePrepare}
    >
      <div className="container">
        {isCamperExist ? (
          <Form layout="vertical">
            <Row>
              <Col span={24}>
                <CleaningsSection
                  cleaningAndPreparationFee={cleaningAndPreparationFee}
                />
              </Col>
              <Divider className="mt-24" />
              <Col span={24}>
                <MileageSection
                  onMilesModeChange={onMilesModeChange}
                  mode={mileage.mode}
                />
              </Col>
              <Divider className="mt-24" />
              <Col span={24}>
                <GeneratorSection
                  hasGenerator={generator.hasGenerator}
                  onGeneratorExistenceChange={onGeneratorExistenceChange}
                  mode={generator.mode}
                  onGeneratorModeChange={onGeneratorModeChange}
                />
              </Col>
              <Divider className="mt-24" />
              <Col span={24}>
                <DumpingSection formatMessage={formatMessage} />
              </Col>
              <Divider className="mt-24" />
              <Col span={24}>
                <CustomFeesSection
                  addCustomFee={addCustomFee}
                  customFees={Object.values(customFees)}
                  removeCustomFee={removeCustomFee}
                  onFrequencyChanged={onFrequencyChanged}
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
};

TripFeesComponent.propTypes = {
  values: PropTypes.shape().isRequired,
  onMilesModeChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onGeneratorExistenceChange: PropTypes.func.isRequired,
  onGeneratorModeChange: PropTypes.func.isRequired,
  addCustomFee: PropTypes.func.isRequired,
  removeCustomFee: PropTypes.func.isRequired,
  onFrequencyChanged: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  leavePagePrepare: PropTypes.func.isRequired,
};

export default TripFeesComponent;
