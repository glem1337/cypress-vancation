import { Col, Row } from 'antd';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

import { DRIVETRAIN, FUEL_TYPE, CURRENT_MILEAGE, TRANSMISSION } from 'constants/camper';
import SelectField from 'views/AddNewCamper/CamperDetails/SelectField';

const TechnicalDetailsForm = ({
  isSubmitting,
  estimateEarningState,
}) => (
  <Row gutter={24}>
    <Col md={12}>
      <div className="main-input">
        <Field
          id="fieldTransmissionID"
          name="transmission"
          className="main-input__field"
          component={SelectField}
          disabled={isSubmitting}
          label={{ id: 'addNewCamper.camperDetails.form.transmission' }}
          placeholder={{ id: 'addNewCamper.camperDetails.form.selectTransmission' }}
          items={TRANSMISSION}
        />
      </div>
    </Col>
    <Col md={12}>
      <div className="main-input">
        <Field
          id="fieldMileageID"
          name="mileage"
          className="main-input__field"
          component={SelectField}
          disabled={isSubmitting}
          label={{ id: 'addNewCamper.camperDetails.form.currentMileage' }}
          placeholder={{ id: 'addNewCamper.camperDetails.form.selectCurrentMileage' }}
          items={CURRENT_MILEAGE}
        />
      </div>
    </Col>
    <Col md={12}>
      <div className="main-input">
        <Field
          id="fieldFuelTypeID"
          name="fuelType"
          className="main-input__field"
          optionLabelProp="label"
          component={SelectField}
          disabled={isSubmitting}
          label={{ id: 'addNewCamper.camperDetails.form.fuelType' }}
          placeholder={{ id: 'addNewCamper.camperDetails.form.selectFuelType' }}
          items={FUEL_TYPE}
        />
      </div>
    </Col>
    <Col md={12}>
      <div className={Classnames(
          'main-input',
          { 'main-input--last': estimateEarningState },
        )}
      >
        <Field
          id="fieldDrivetrainID"
          name="drivetrain"
          className="main-input__field"
          component={SelectField}
          disabled={isSubmitting}
          label={{ id: 'addNewCamper.camperDetails.form.drivetrain' }}
          placeholder={{ id: 'addNewCamper.camperDetails.form.selectDrivetrain' }}
          items={DRIVETRAIN}
        />
      </div>
    </Col>
  </Row>
);

TechnicalDetailsForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  estimateEarningState: PropTypes.bool.isRequired,
};

export default TechnicalDetailsForm;
