import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';

import CustomAccommodation from './CustomAccommodation';

const CustomAccommodationSection = ({
  amenityIndex,
  items,
  removeCustomAccommodation,
  addCustomAccommodation,
  onMaxCustomAccommodationQuantityCallback,
}) => (
  <>
    <div className="mb-24 text-subheader font-400">
      <FormattedMessage id="addNewCamper.amenities.customAccommodation" />
    </div>
    {items
      && items.map(({ id }, index) => (
        <Row key={id} gutter={24}>
          <Col span={24}>
            <Row gutter={24}>
              <Col lg={12}>
                <CustomAccommodation
                  amenityIndex={amenityIndex}
                  index={index}
                  onRemove={removeCustomAccommodation({ amenityIndex, index })}
                  onMaxCustomAccommodationQuantityCallback={
                    onMaxCustomAccommodationQuantityCallback
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
    <Button onClick={addCustomAccommodation(amenityIndex)} type="secondary">
      <FormattedMessage id="addNewCamper.amenities.addCustomBed" />
    </Button>
  </>
);

CustomAccommodationSection.defaultProps = {
  items: null,
};

CustomAccommodationSection.propTypes = {
  amenityIndex: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  removeCustomAccommodation: PropTypes.func.isRequired,
  addCustomAccommodation: PropTypes.func.isRequired,
  onMaxCustomAccommodationQuantityCallback: PropTypes.func.isRequired,
};

export default CustomAccommodationSection;
