import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form } from 'antd';
import { Field } from 'formik';

import isPresent from 'utils/isPresent';

import { CAMPER_AMENITY_OPTION_TYPES } from 'constants/camperAmenities';

import CheckboxField from 'views/shared/CheckboxField';
import SwitchField from 'views/shared/SwitchField';
import BigCheckbox from 'views/shared/BigCheckbox';
import Checkbox from 'views/shared/Checkbox';
import TooltipIcon from 'views/shared/TooltipIcon';

const Options = ({ amenityIndex, items, handleSwitchChange }) => {
  if (!isPresent(items)) return null;

  return items.map((item, index) => (
    <React.Fragment key={item.id}>
      <Col span={24}>
        <div className="d-flex align-items-center mb-20">
          <Field
            name={`amenities[${amenityIndex}]configurationAmenityOptions[${index}]state`}
            component={SwitchField}
            asComponent={
                item.type === CAMPER_AMENITY_OPTION_TYPES.CHECKBOX
                  ? Checkbox
                  : undefined
              }
            onToggle={
                item.configurationSubAmenities
                && handleSwitchChange({
                  amenityIndex,
                  optionIndex: index,
                })
              }
          />
          <img src={item.iconUrl} className="mr-12 ml-12" alt="" />
          <span>{item.title}</span>
          {item.tooltip && (
          <TooltipIcon
            phrase={item.tooltip}
            iconClass="icon-info-f font-24"
          />
            )}
        </div>
      </Col>
      {item.configurationSubAmenities
        && item.state
        && item.configurationSubAmenities.map(
          (amenity, subAmenityIndex) => (
            <Col key={amenity.id} md={8} lg={6}>
              <Form.Item>
                <Field
                  name={`amenities[${amenityIndex}]configurationAmenityOptions[${index}]configurationSubAmenities[${subAmenityIndex}]state`}
                  component={CheckboxField}
                  asComponent={BigCheckbox}
                  title={amenity.title}
                  icon={amenity.iconUrl}
                  tooltip={amenity.tooltip}
                />
              </Form.Item>
            </Col>
          ),
        )}
    </React.Fragment>
  ));
};

Options.defaultProps = {
  items: null,
};

Options.propTypes = {
  amenityIndex: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()),
  handleSwitchChange: PropTypes.func.isRequired,
};

export default Options;
