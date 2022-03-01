import PropTypes from 'prop-types';
import { Button, Space } from 'antd';
import { FormattedMessage } from 'react-intl';

import isPresent from 'utils/isPresent';

import SkeletonText from 'views/shared/SkeletonText';
import AmenitySection from './AmenitySection';
import GlamperSection from './GlamperSection';

const Amenities = ({
  isCamperExist,
  isLoading,
  items,
  activePanelIds,
  togglePanels,
  allPanelsActive,
  onCollapseChangeHandler,
  glamper,
}) => {
  if (!isCamperExist || isLoading) {
    return (
      <div className="mb-24">
        <div className="skeleton__title w-100" />
        <SkeletonText />
      </div>
    );
  }

  if (!isPresent(items)) {
    return null;
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-space-between mb-24">
        <p className="text-headline">
          <FormattedMessage id="shared.amenities" />
        </p>
        <Button onClick={togglePanels} type="secondary" size="small">
          <FormattedMessage
            id={allPanelsActive ? 'shared.hideAll' : 'shared.showAll'}
          />
        </Button>
      </div>
      <Space direction="vertical" className="w-100" size={16}>
        {isPresent(glamper.subAmenities) && (
          <GlamperSection
            amenity={glamper}
            activeKey={activePanelIds}
            onCollapse={onCollapseChangeHandler}
          />
        )}
        {items.map((item) => (
          <AmenitySection
            key={item.id}
            onCollapse={onCollapseChangeHandler}
            amenity={item}
            activeKey={activePanelIds}
          />
        ))}
      </Space>
    </>
  );
};

Amenities.defaultProps = {
  items: null,
  isLoading: false,
};

Amenities.propTypes = {
  allPanelsActive: PropTypes.bool.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape()),
  activePanelIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  togglePanels: PropTypes.func.isRequired,
  onCollapseChangeHandler: PropTypes.func.isRequired,
  glamper: PropTypes.shape().isRequired,
};

export default Amenities;
