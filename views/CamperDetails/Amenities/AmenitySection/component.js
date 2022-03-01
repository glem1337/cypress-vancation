import React from 'react';
import { Col, Collapse, Row } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import SubAmenities from './SubAmenities';
import Options from './Options';
import ExpandIcon from '../ExpandIcon';

const AmenitySection = ({
  allItemsVisible,
  toggleVisibility,
  onCollapse,
  subAmenities,
  activeKey,
  options,
  amenity: { configurationAmenity, customAmenities },
}) => (
  <Collapse
    onChange={onCollapse}
    activeKey={activeKey}
    className="van-details__amenities"
    expandIcon={ExpandIcon}
    expandIconPosition="right"
  >
    <Collapse.Panel
      key={configurationAmenity?.id}
      header={(
        <>
          <img src={configurationAmenity?.iconUrl} alt="" />
          <p className="text-subtitle font-700">
            {configurationAmenity?.title}
          </p>
        </>
      )}
    >
      <Row gutter={24}>
        <SubAmenities items={subAmenities} customAmenities={customAmenities} />
        <Options items={options} />
        <Col span={24}>
          <button
            onClick={toggleVisibility}
            type="button"
            className="main-link mb-24 in-blue-1000 font-600"
          >
            <FormattedMessage
              id={
                allItemsVisible
                  ? 'shared.hideUnavailable'
                  : 'shared.showUnavailable'
              }
            />
          </button>
        </Col>
      </Row>
    </Collapse.Panel>
  </Collapse>
);

AmenitySection.propTypes = {
  allItemsVisible: PropTypes.bool.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  onCollapse: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  subAmenities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  activeKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  amenity: PropTypes.shape().isRequired,
};

export default AmenitySection;
