import { FormattedMessage } from 'react-intl';
import {
 Col, Row, Form, Radio, Switch, Tag,
} from 'antd';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import { TRIP_FEES } from 'constants/camper';
import InputField from 'views/shared/InputField';

const GeneratorSection = ({
  hasGenerator,
  onGeneratorExistenceChange,
  mode,
  onGeneratorModeChange,
}) => (
  <Row gutter={24}>
    <Col lg={16}>
      <div className="mb-8 text-subheader font-700">
        <FormattedMessage id="addNewCamper.tripFees.generator.title" />
      </div>
      <p className="mb-24">
        <FormattedMessage id="addNewCamper.tripFees.generator.subTitle" />
      </p>
      <div className="d-flex align-items-center">
        <Switch
          checked={hasGenerator}
          onChange={onGeneratorExistenceChange}
        />
        <span className="ml-8">
          <FormattedMessage id="addNewCamper.tripFees.generator.gasGenerator" />
        </span>
      </div>
      {hasGenerator && (
        <>
          <Form.Item className="mt-16 mb-0">
            <Radio.Group
              size="large"
              value={mode}
              onChange={onGeneratorModeChange}
              className="radio_wrapper"
            >
              <div className="mb-20">
                <Radio value={TRIP_FEES.GENERATOR_VALUES.UNLIMITED}>
                  <span className="ml-12">
                    <FormattedMessage id="addNewCamper.tripFees.generator.allowUnlimited" />
                  </span>
                  <Tag
                    className="mt-12 mt-md-0 ml-12 ml-md-8"
                    color="cyan"
                    icon={<i className="icon icon-like-f" />}
                  >
                    <FormattedMessage id="shared.vancationRecommended" />
                  </Tag>
                </Radio>
              </div>
              <div>
                <Radio value={TRIP_FEES.GENERATOR_VALUES.LIMITED}>
                  <span className="ml-12">
                    <FormattedMessage id="addNewCamper.tripFees.generator.ownRate" />
                  </span>
                </Radio>
              </div>
            </Radio.Group>
          </Form.Item>
          {mode === TRIP_FEES.GENERATOR_VALUES.LIMITED && (
            <Row className="mt-16" gutter={[24, 16]}>
              <Col md={12}>
                <div className="main-input-wrap-addtxt-extended">
                  <Field
                    name="generator.included"
                    id="generator.included"
                    className="main-input__field"
                    component={InputField}
                    label={{ id: 'addNewCamper.tripFees.mileage.includedHours' }}
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
                <div className="main-input-wrap-addtxt main-input-wrap-addtxt-extended">
                  <Field
                    name="generator.overage"
                    id="generator.overage"
                    component={InputField}
                    label={{ id: 'addNewCamper.tripFees.overageCharge' }}
                    placeholder="0"
                    type="number"
                    prefix="$"
                    formItemClasses="mb-0"
                  />
                  <span className="main-input__add-txt main-input__add-txt-ext">
                    <FormattedMessage id="addNewCamper.tripFees.perHour" />
                  </span>
                </div>
              </Col>
            </Row>
          )}
        </>
      )}
    </Col>
  </Row>
);

GeneratorSection.propTypes = {
  hasGenerator: PropTypes.bool.isRequired,
  onGeneratorExistenceChange: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  onGeneratorModeChange: PropTypes.func.isRequired,
};

export default GeneratorSection;
