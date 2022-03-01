import PropTypes from 'prop-types';
import { Col } from 'antd';
import classNames from 'classnames';

import TooltipIcon from 'views/shared/TooltipIcon';

const SubAmenities = ({ items, customAmenities }) => (
  <>
    {items.map((item) => (
      <Col key={item.id} md={12} lg={8}>
        <div
          className={classNames('van-details__details-card', {
            'van-details__unavailable-item': !item.available,
          })}
        >
          <img src={item.iconUrl} alt="" />
          <p>
            {Boolean(item.quantity) && `${item.quantity} x `}
            {item.title}
          </p>
          {item.tooltip && <TooltipIcon phrase={item.tooltip} />}
        </div>
      </Col>
    ))}
    {customAmenities.map((item) => (
      <Col key={item.id} md={12} lg={8}>
        <div className="van-details__details-card">
          <p>
            {`${item.quantity} x `}
            {item.name}
          </p>
        </div>
      </Col>
    ))}
  </>
);

SubAmenities.defaultProps = {
  customAmenities: [],
};

SubAmenities.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  customAmenities: PropTypes.arrayOf(PropTypes.shape()),
};

export default SubAmenities;
