import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form } from 'antd';
import { Field } from 'formik';

import isPresent from 'utils/isPresent';

import { CAMPER_AMENITIES_CONFIG } from 'constants/camperAmenities';

import CheckboxField from 'views/shared/CheckboxField';
import BigCheckbox from 'views/shared/BigCheckbox';
import InputNumericField from 'views/shared/InputNumericField';

const SubAmenities = ({ amenityIndex, items, onMaxAccommodationQuantityCallback }) => {
  if (!isPresent(items)) return null;

  return items.map((item, index) => {
    const withQuantity = item.maxQuantity !== 0;
    return (
      <Col key={item.id} md={withQuantity ? 12 : 8} lg={withQuantity ? 12 : 6}>
        <Form.Item>
          <Field
            name={`amenities[${amenityIndex}]configurationSubAmenities[${index}]state`}
            component={CheckboxField}
            asComponent={BigCheckbox}
            title={item.title}
            icon={item.iconUrl}
            tooltip={item.tooltip}
          >
            {withQuantity && (
              <Field
                name={`amenities[${amenityIndex}]configurationSubAmenities[${index}]quantity`}
                component={InputNumericField}
                min={CAMPER_AMENITIES_CONFIG.MIN_QUANTITY}
                max={item.maxQuantity}
                onMaxValueTrigger={onMaxAccommodationQuantityCallback}
              />
            )}
          </Field>
        </Form.Item>
      </Col>
    );
  });
};

SubAmenities.defaultProps = {
  items: null,
};

SubAmenities.propTypes = {
  onMaxAccommodationQuantityCallback: PropTypes.func.isRequired,
  amenityIndex: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()),
};

export default SubAmenities;
