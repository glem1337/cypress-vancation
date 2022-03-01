import { Button, Select, Form } from 'antd';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import InputField from 'views/shared/InputField';
import { FormattedMessage } from 'react-intl';

import { TRIP_FEES } from 'constants/camper';

const CustomFee = ({
  id,
  frequency,
  removeFee,
  onFrequencyChanged,
}) => (
  <div className="custom-acc-wrap custom-fee-wrap custom-fee-wrap-extended">
    <div className="flex-1 mb-16 mb-md-0">
      <Field
        name={`customFees.${id}.name`}
        id={`customFees.${id}.name`}
        className="main-input__field w-100"
        component={InputField}
        label={{ id: 'shared.feeName' }}
        formItemClasses="mb-0"
      />
    </div>
    <div className="d-flex">
      <div className="custom-acc-wrap__sec-input flex-1">
        <div className="main-input-wrap-addtxt">
          <Field
            name={`customFees.${id}.price`}
            id={`customFees.${id}.price`}
            className="w-100 custom-acc-wrap__price"
            component={InputField}
            label={{ id: 'shared.price' }}
            placeholder="0"
            type="number"
            prefix="$"
            formItemClasses="mb-0"
          />
        </div>
      </div>
      <Form.Item className="flex-1 mb-0">
        <Select
          name="fieldName"
          className="main-input__field main-input__field--no-label"
          optionLabelProp="label"
          defaultValue={TRIP_FEES.FREQUENCY_OPTIONS.PER_DAY.VALUE}
          onChange={onFrequencyChanged}
          value={frequency}
        >
          <Select.Option
            className="p-0"
            value={TRIP_FEES.FREQUENCY_OPTIONS.PER_EACH.VALUE}
            label={<FormattedMessage {...TRIP_FEES.FREQUENCY_OPTIONS.PER_EACH.LABEL} />}
          >
            <li className="main-dropdown__item">
              <FormattedMessage {...TRIP_FEES.FREQUENCY_OPTIONS.PER_EACH.LABEL} />
            </li>
          </Select.Option>
          <Select.Option
            className="p-0"
            value={TRIP_FEES.FREQUENCY_OPTIONS.PER_DAY.VALUE}
            label={<FormattedMessage {...TRIP_FEES.FREQUENCY_OPTIONS.PER_DAY.LABEL} />}
          >
            <li className="main-dropdown__item">
              <FormattedMessage {...TRIP_FEES.FREQUENCY_OPTIONS.PER_DAY.LABEL} />
            </li>
          </Select.Option>
        </Select>
      </Form.Item>
    </div>
    <div className="custom-acc-wrap__close">
      <Button
        type="secondary"
        icon={<i className="icon icon-cross" />}
        onClick={removeFee}
      />
    </div>
  </div>
);

CustomFee.propTypes = {
  id: PropTypes.string.isRequired,
  removeFee: PropTypes.func.isRequired,
  onFrequencyChanged: PropTypes.func.isRequired,
  frequency: PropTypes.string.isRequired,
};

export default CustomFee;
