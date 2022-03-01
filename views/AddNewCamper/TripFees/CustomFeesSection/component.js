import { FormattedMessage } from 'react-intl';
import {
  Col, Row, Button,
 } from 'antd';
import PropTypes from 'prop-types';

import { FORM_VALIDATION } from 'constants/camper';

import CustomFee from '../CustomFee';

const CustomFeesSection = ({
  addCustomFee,
  customFees,
  removeCustomFee,
  onFrequencyChanged,
}) => (
  <Row gutter={24}>
    <Col lg={16}>
      <div className="mb-8 text-subheader font-400">
        <FormattedMessage id="addNewCamper.tripFees.custom.title" />
      </div>
      <p className="mb-24">
        <FormattedMessage id="addNewCamper.tripFees.custom.subTitle" />
      </p>
      {customFees.map(item => (
        <CustomFee
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          frequency={item.frequency}
          removeFee={removeCustomFee(item)}
          onFrequencyChanged={onFrequencyChanged(item.id)}
        />
      ))}
      <Button
        className="mb-24"
        type="secondary"
        onClick={addCustomFee}
        disabled={customFees.length >= FORM_VALIDATION.MAX_CUSTOM_FEES_COUNT}
      >
        <FormattedMessage id="addNewCamper.tripFees.custom.buttonLabel" />
      </Button>
    </Col>
  </Row>
);

CustomFeesSection.propTypes = {
  addCustomFee: PropTypes.func.isRequired,
  customFees: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  removeCustomFee: PropTypes.func.isRequired,
  onFrequencyChanged: PropTypes.func.isRequired,
};

export default CustomFeesSection;
