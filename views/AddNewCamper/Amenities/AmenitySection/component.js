import React from 'react';
import { Divider, Row } from 'antd';
import PropTypes from 'prop-types';

import SubAmenities from './SubAmenities';
import Options from './Options';

const AmenitySection = ({
  index,
  title,
  icon,
  items,
  withDivider,
  options,
  handleSwitchChange,
  onMaxAccommodationQuantityCallback,
}) => (
  <>
    <div className="d-flex align-items-center mb-24">
      {icon && <img src={icon} className="mr-12" alt="" />}
      <span className="text-subheader font-700">{title}</span>
    </div>
    <Row gutter={24}>
      <SubAmenities
        onMaxAccommodationQuantityCallback={onMaxAccommodationQuantityCallback}
        amenityIndex={index}
        items={items}
      />
      <Options
        amenityIndex={index}
        items={options}
        handleSwitchChange={handleSwitchChange}
      />
    </Row>
    {withDivider && <Divider />}
  </>
);

AmenitySection.defaultProps = {
  items: null,
  options: null,
  icon: null,
};

AmenitySection.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape()),
  options: PropTypes.arrayOf(PropTypes.shape()),
  withDivider: PropTypes.bool.isRequired,
  handleSwitchChange: PropTypes.func.isRequired,
  onMaxAccommodationQuantityCallback: PropTypes.func.isRequired,
};

export default AmenitySection;
