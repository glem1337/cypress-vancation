import { Col, Row } from 'antd';
import { Field } from 'formik';
import SelectField from 'views/AddNewCamper/CamperDetails/SelectField';
import InputField from 'views/shared/InputField';
import PropTypes from 'prop-types';
import { INSIDE_HEIGHT } from 'constants/camper';
import { STATE, NEW_YORK_STATE } from 'constants/index';
import GeocoderField from 'views/shared/GeocoderField';
import OptionInsideHeight from './OptionInsideHeight';

const GeneralForm = ({
  years,
  camperLength,
  vehicleTypes,
  vehicleMake,
  vehicleModel,
  handlerMake,
  builtCamper,
  isSubmitting,
}) => (
  <Row gutter={24}>
    <Col md={12}>
      <div className="main-input">
        <Field
          as="select"
          showSearch
          id="fieldMakeID"
          name="name"
          className="main-input__field"
          component={SelectField}
          disabled={isSubmitting}
          label={{ id: 'addNewCamper.camperDetails.form.make' }}
          placeholder={{ id: 'addNewCamper.camperDetails.form.selectMake' }}
          items={vehicleMake}
          onSelect={handlerMake}
        />
      </div>
    </Col>
    <Col md={12}>
      <div className="main-input">
        <Field
          showSearch
          id="fieldModalID"
          name="modelNaming"
          className="main-input__field"
          component={SelectField}
          disabled={isSubmitting}
          label={{ id: 'addNewCamper.camperDetails.form.Model' }}
          placeholder={{ id: 'addNewCamper.camperDetails.form.selectModel' }}
          items={vehicleModel}
        />
      </div>
    </Col>
    <Col md={24}>
      <div className="main-input">
        <Field
          id="fieldVehicleTypeID"
          name="vehicleTypeName"
          className="main-input__field"
          component={SelectField}
          disabled={isSubmitting}
          label={{ id: 'addNewCamper.camperDetails.form.vehicleType' }}
          placeholder={{ id: 'addNewCamper.camperDetails.form.selectVehicleType' }}
          items={vehicleTypes}
          renderItem={OptionInsideHeight}
        />
      </div>
    </Col>
    <Col md={12}>
      <div className="main-input">
        <Field
          id="fieldYearID"
          name="year"
          className="main-input__field"
          component={SelectField}
          disabled={isSubmitting}
          label={{ id: 'addNewCamper.camperDetails.form.year' }}
          placeholder={{ id: 'addNewCamper.camperDetails.form.selectYear' }}
          items={years}
        />
      </div>
    </Col>
    <Col md={12}>
      <div className="main-input">
        <Field
          id="fieldWhoBuiltCamperID"
          name="whoBuiltCamper"
          className="main-input__field"
          component={SelectField}
          disabled={isSubmitting}
          label={{ id: 'addNewCamper.camperDetails.form.whoBuiltYourCamper' }}
          placeholder={{ id: 'addNewCamper.camperDetails.form.selectWhoBuiltYourCamper' }}
          items={builtCamper}
          showSearch
        />
      </div>
    </Col>
    <Col md={12}>
      <div className="main-input">
        <Field
          type="number"
          id="fieldLengthID"
          name="length"
          showSearch
          className="main-input__field"
          component={SelectField}
          disabled={isSubmitting}
          tooltip={{ id: 'addNewCamper.camperDetails.form.length.tooltip' }}
          label={{ id: 'addNewCamper.camperDetails.form.length' }}
          placeholder={{ id: 'addNewCamper.camperDetails.form.selectLength' }}
          items={camperLength}
          numbersOnly
        />
      </div>
    </Col>
    <Col md={12}>
      <div className="main-input">
        <Field
          id="fieldInsideHeightID"
          name="insideHeight"
          className="main-input__field"
          component={SelectField}
          disabled={isSubmitting}
          label={{ id: 'addNewCamper.camperDetails.form.insideHeight' }}
          placeholder={{ id: 'addNewCamper.camperDetails.form.selectInsideHeight' }}
          items={INSIDE_HEIGHT}
          renderItem={OptionInsideHeight}
        />
      </div>
    </Col>
    <Col md={12}>
      <div className="main-input">
        <Field
          name="sleeps"
          className="main-input__field"
          component={InputField}
          disabled={isSubmitting}
          label={{ id: 'addNewCamper.camperDetails.form.sleeps' }}
          tooltip={{ id: 'addNewCamper.camperDetails.form.howManyPeopleSleep' }}
          type="number"
        />
      </div>
    </Col>
    <Col md={12}>
      <div className="main-input">
        <Field
          name="seats"
          className="main-input__field"
          component={InputField}
          disabled={isSubmitting}
          label={{ id: 'addNewCamper.camperDetails.form.seats' }}
          tooltip={{ id: 'addNewCamper.camperDetails.form.numberOfSeats' }}
          type="number"
        />
      </div>
    </Col>
    <Col span={24}>
      <div className="mb-16">
        <Field
          name="camperLocation"
          component={GeocoderField}
          disabled={isSubmitting}
          label={{ id: 'addNewCamper.camperDetails.from.camperLocation' }}
          placeholder={{ id: 'addNewCamper.camperDetails.from.addCamperLocation' }}
          prefix={<i className="icon icon-location" />}
          allowClear
        />
      </div>
    </Col>
    <Col md={12}>
      <div className="mb-20">
        <Field
          id="fieldRegistredID"
          name="stateRegistred"
          className="main-input__field"
          component={SelectField}
          disabled={isSubmitting}
          label={{ id: 'addNewCamper.camperDetails.form.stateRegistered' }}
          placeholder={{ id: 'addNewCamper.camperDetails.form.selectStateRegistered' }}
          items={STATE.filter(item => item.value !== NEW_YORK_STATE.value)}
          showSearch
          autoSave={false}
        />
      </div>
    </Col>
  </Row>
);

GeneralForm.defaultProps = {
  years: [],
  camperLength: [],
  vehicleTypes: [],
  vehicleMake: [],
  vehicleModel: [],
  builtCamper: [],
};

GeneralForm.propTypes = {
  years: PropTypes.arrayOf(PropTypes.shape()),
  camperLength: PropTypes.arrayOf(PropTypes.shape()),
  vehicleTypes: PropTypes.arrayOf(PropTypes.shape()),
  vehicleMake: PropTypes.arrayOf(PropTypes.shape()),
  vehicleModel: PropTypes.arrayOf(PropTypes.shape()),
  builtCamper: PropTypes.arrayOf(PropTypes.shape()),
  handlerMake: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,

};

export default GeneralForm;
