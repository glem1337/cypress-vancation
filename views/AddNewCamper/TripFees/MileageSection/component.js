import { FormattedMessage } from 'react-intl';
import {
 Col, Row, Form, Radio,
} from 'antd';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import { TRIP_FEES } from 'constants/camper';
import InputField from 'views/shared/InputField';

const MileageSection = ({
  onMilesModeChange,
  mode,
}) => (
  <Row gutter={24}>
    <Col lg={16}>
      <div className="mb-8 text-subheader font-700">
        <FormattedMessage id="addNewCamper.tripFees.mileage.title" />
      </div>
      <p className="mb-24">
        <FormattedMessage id="addNewCamper.tripFees.mileage.subTitle" />
      </p>
      <Form.Item className="mb-0">
        <Radio.Group
          size="large"
          value={mode}
          onChange={onMilesModeChange}
          className="radio_wrapper"
        >
          <div className="mb-20">
            <Radio value={TRIP_FEES.MILEAGE_VALUES.UNLIMITED}>
              <span className="ml-12">
                <FormattedMessage id="addNewCamper.tripFees.mileage.unlimited" />
              </span>
            </Radio>
          </div>
          <div>
            <Radio value={TRIP_FEES.MILEAGE_VALUES.LIMITED}>
              <span className="ml-12">
                <FormattedMessage id="addNewCamper.tripFees.mileage.limitNumber" />
              </span>
            </Radio>
          </div>
        </Radio.Group>
      </Form.Item>
      {mode === TRIP_FEES.MILEAGE_VALUES.LIMITED && (
        <Row className="mt-16" gutter={[24, 16]}>
          <Col md={12}>
            <div className="main-input-wrap-addtxt-extended">
              <Field
                name="mileage.included"
                id="mileage.included"
                className="main-input__field"
                component={InputField}
                label={{ id: 'addNewCamper.tripFees.mileage.includedMiles' }}
                placeholder="0"
                type="number"
                formItemClasses="mb-0"
              />
              <span className="main-input__add-txt main-input__add-txt-ext">
                <FormattedMessage id="addNewCamper.tripFees.perDay" />
              </span>
            </div>
          </Col>
          <Col md={12}>
            <div className="main-input-wrap-addtxt-extended main-input-wrap-addtxt">
              <Field
                name="mileage.overage"
                id="mileage.overage"
                component={InputField}
                label={{ id: 'addNewCamper.tripFees.overageCharge' }}
                placeholder="0"
                type="number"
                prefix="$"
                formItemClasses="mb-0"
              />
              <span className="main-input__add-txt main-input__add-txt-ext">
                <FormattedMessage id="addNewCamper.tripFees.perMile" />
              </span>
            </div>
          </Col>
        </Row>
      )}
    </Col>
  </Row>
);

MileageSection.propTypes = {
  onMilesModeChange: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};

export default MileageSection;
