import { Col, Collapse, Row } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import SubAmenities from 'views/CamperDetails/Amenities/AmenitySection/SubAmenities';
import ExpandIcon from '../ExpandIcon';

const GlamperSection = ({
  allItemsVisible,
  toggleVisibility,
  onCollapse,
  subAmenities,
  activeKey,
  amenity: { configurationAmenity },
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
            <FormattedMessage {...configurationAmenity?.title} />
          </p>
        </>
      )}
    >
      <Row gutter={24}>
        <SubAmenities items={subAmenities} />
        <Col span={24}>
          <button
            onClick={toggleVisibility}
            type="button"
            className="main-link mb-24 in-blue-1000 font-600"
          >
            <FormattedMessage
              id={allItemsVisible ? 'shared.hide' : 'shared.showAll'}
            />
          </button>
        </Col>
      </Row>
    </Collapse.Panel>
  </Collapse>
);

GlamperSection.propTypes = {
  allItemsVisible: PropTypes.bool.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  onCollapse: PropTypes.func.isRequired,
  subAmenities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  activeKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  amenity: PropTypes.shape().isRequired,
};

export default GlamperSection;
