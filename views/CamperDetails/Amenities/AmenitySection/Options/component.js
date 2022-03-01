import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import classNames from 'classnames';

import isPresent from 'utils/isPresent';

import TooltipIcon from 'views/shared/TooltipIcon';
import SubAmenities from 'views/CamperDetails/Amenities/AmenitySection/SubAmenities';

const Options = ({ items }) => items.map((item) => (
  <React.Fragment key={item.id}>
    <Col span={24}>
      <div
        className={classNames('d-flex align-items-center mb-20', {
            'van-details__unavailable-item': !item.available,
        })}
      >
        <img className="mr-12" src={item.iconUrl} alt="" />
        <p className="in-black font-600">{item.title}</p>
        {item.tooltip && (
          <TooltipIcon
            iconClass="icon-info-f font-24"
            phrase={item.tooltip}
          />
          )}
      </div>
    </Col>
    {isPresent(item.subAmenities) && (
      <Col span={24}>
        <Row className="pl-md-32" gutter={24}>
          <SubAmenities items={item.subAmenities} />
        </Row>
      </Col>
    )}
  </React.Fragment>
));

Options.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Options;
