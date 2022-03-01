import PropTypes from 'prop-types';
import { Alert, Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';

import { STATE, NEW_YORK_STATE } from 'constants/index';

import InputField from 'views/shared/InputField/container';
import SelectField from 'views/AddNewCamper/CamperDetails/SelectField/container';

const VehicleInfoSection = ({ isLoading }) => (
  <>
    <Col lg={16}>
      <h2 className="text-subheader mb-8">
        <FormattedMessage id="dashboard.editCamper.insurance.vehicleInfo.title" />
      </h2>
      <p className="mb-16">
        <FormattedMessage id="dashboard.editCamper.insurance.vehicleInfo.description" />
      </p>
    </Col>
    <Col md={12}>
      <Field
        name="vinNumber"
        id="vinNumber"
        component={InputField}
        label={{ id: 'dashboard.editCamper.insurance.vin.label' }}
      />
    </Col>
    <Col md={16}>
      <Alert
        className="mb-24"
        type="warning"
        showIcon
        icon={<i className="icon icon-idea" />}
        message={
          <FormattedMessage id="dashboard.editCamper.insurance.vehicleInfo.alert" />
        }
      />
    </Col>
    <div className="w-100" />
    <Col md={12} lg={8}>
      <Field
        id="stateRegistered"
        name="stateRegistered"
        className="main-input__field"
        component={SelectField}
        disabled={isLoading}
        label={{
          id: 'addNewCamper.camperDetails.form.stateRegistered',
        }}
        placeholder={{
          id: 'addNewCamper.camperDetails.form.selectStateRegistered',
        }}
        items={STATE.filter(item => item.value !== NEW_YORK_STATE.value)}
        showSearch
        autoSave={false}
      />
    </Col>
    <Col md={12} lg={8}>
      <Field
        name="licensePlate"
        id="licensePlate"
        component={InputField}
        label={{
          id: 'dashboard.editCamper.insurance.licensePlate.label',
        }}
      />
    </Col>
  </>
);

VehicleInfoSection.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default VehicleInfoSection;
