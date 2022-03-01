import { Col, Divider, Row } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import isPresent from 'utils/isPresent';

import SkeletonText from 'views/shared/SkeletonText';
import AddonCard from './AddonCard';

const Addons = ({
  initialized,
  onRef,
  isCamperExist,
  isLoading,
  allItemsVisible,
  totalItems,
  toggleVisibleItems,
  items,
  defaultVisibleCount,
}) => {
  if (!isCamperExist || isLoading) {
    return (
      <div ref={onRef}>
        <div className="skeleton__title w-100" />
        <Row gutter={24}>
          <Col md={8} xl={6}>
            <SkeletonText />
          </Col>
          <Col md={8} xl={6}>
            <SkeletonText />
          </Col>
          <Col md={8} xl={6}>
            <SkeletonText />
          </Col>
        </Row>
        <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
      </div>
    );
  }

  if (!isPresent(items) && initialized) {
    return null;
  }

  return (
    <div ref={onRef}>
      {initialized && (
        <>
          <p className="text-headline mb-24">
            <FormattedMessage id="shared.addons" />
          </p>
          <Row gutter={24}>
            {items.map((item) => (
              <Col key={item.id} md={8} xl={6}>
                <AddonCard
                  iconUrl={item.iconUrl}
                  price={item.price}
                  priceUnit={item.priceUnit}
                  name={item.name}
                  description={item.description}
                />
              </Col>
            ))}
          </Row>
          {totalItems > defaultVisibleCount && (
            <a
              onClick={toggleVisibleItems}
              className="main-link in-blue-1000 font-600"
              role="button"
            >
              <FormattedMessage
                id={
                  allItemsVisible ? 'shared.hideCount' : 'shared.showAllCount'
                }
                values={{
                  count: totalItems - defaultVisibleCount,
                }}
              />
            </a>
          )}
          <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
        </>
      )}
    </div>
  );
};

Addons.defaultProps = {
  onRef: undefined,
  isLoading: false,
};

Addons.propTypes = {
  onRef: PropTypes.func,
  isLoading: PropTypes.bool,
  initialized: PropTypes.bool.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  allItemsVisible: PropTypes.bool.isRequired,
  totalItems: PropTypes.number.isRequired,
  defaultVisibleCount: PropTypes.number.isRequired,
  toggleVisibleItems: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Addons;
