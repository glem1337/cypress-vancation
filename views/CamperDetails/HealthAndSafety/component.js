import { Col } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { DEFAULT_VISIBLE_RULES_COUNT } from 'constants/camperDetails/rules';

import Rules from 'views/CamperDetails/RulesAndTravels/Rules';
import SkeletonText from 'views/shared/SkeletonText';

const HealthAndSafety = ({
  total,
  items,
  onToggle,
  allItemsVisible,
  isCamperExist,
  isLoading,
}) => {
  if (!isCamperExist || isLoading) {
    return (
      <Col md={12}>
        <div className="skeleton__title w-100" />
        <SkeletonText rows={4} />
      </Col>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <Col md={12}>
      <p className="text-headline mb-24">
        <FormattedMessage id="dashboard.editCamper.amenities.healthAndSafety.title" />
      </p>
      <Rules
        visibleItems={items}
        allItemsVisible={allItemsVisible}
        defaultVisibleCount={DEFAULT_VISIBLE_RULES_COUNT}
        onToggle={onToggle}
        totalItems={total}
      />
    </Col>
  );
};

HealthAndSafety.defaultProps = {
  isLoading: false,
};

HealthAndSafety.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  total: PropTypes.number.isRequired,
  allItemsVisible: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
};

export default HealthAndSafety;
