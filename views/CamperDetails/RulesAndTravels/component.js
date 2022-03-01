import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'antd';

import {
  DEFAULT_VISIBLE_RESTRICTIONS_COUNT,
  DEFAULT_VISIBLE_RULES_COUNT,
} from 'constants/camperDetails/rules';

import SkeletonText from 'views/shared/SkeletonText';
import Rules from './Rules';

const RulesAndTravels = ({
  initialized,
  onRef,
  allRulesVisible,
  visibleRules,
  totalRules,
  toggleVisibleRules,
  allLocationsVisible,
  visibleLocations,
  totalLocations,
  toggleVisibleLocations,
  hasAvailableLocation,
  allRoadsVisible,
  totalRoads,
  visibleRoads,
  toggleVisibleRoads,
  hasAvailableRoad,
  isCamperExist,
  isLoading,
}) => {
  if (!isCamperExist || isLoading) {
    return (
      <Row ref={onRef} gutter={24}>
        <Col md={12} className="mb-24 mb-md-0">
          <div className="skeleton__title w-100" />
          <SkeletonText />
        </Col>
        <Col md={12}>
          <Row gutter={24}>
            <Col span={12}>
              <div className="skeleton__title w-100" />
              <SkeletonText />
            </Col>
            <Col span={12}>
              <div className="skeleton__title w-100" />
              <SkeletonText />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }

  return (
    <Row ref={onRef} gutter={24}>
      {initialized && (
        <>
          {totalRules > 0 && (
            <Col md={12} className="mb-24 mb-md-0">
              <p className="text-headline mb-24">
                <FormattedMessage id="shared.rules" />
              </p>
              <Rules
                visibleItems={visibleRules}
                onToggle={toggleVisibleRules}
                allItemsVisible={allRulesVisible}
                totalItems={totalRules}
                defaultVisibleCount={DEFAULT_VISIBLE_RULES_COUNT}
              />
            </Col>
          )}
          {(hasAvailableLocation || hasAvailableRoad) && (
            <Col md={12}>
              <p className="text-headline mb-24">
                <FormattedMessage id="dashboard.editCamper.rulesAndTravels.travels.title" />
              </p>
              <Row gutter={24}>
                {hasAvailableLocation && (
                  <Col span={12}>
                    <p className="mb-16">
                      <FormattedMessage id="shared.location" />
                    </p>
                    <Rules
                      visibleItems={visibleLocations}
                      onToggle={toggleVisibleLocations}
                      allItemsVisible={allLocationsVisible}
                      totalItems={totalLocations}
                      defaultVisibleCount={DEFAULT_VISIBLE_RESTRICTIONS_COUNT}
                    />
                  </Col>
                )}
                {hasAvailableRoad && (
                  <Col span={12}>
                    <p className="mb-16">
                      <FormattedMessage id="dashboard.editCamper.rulesAndTravels.roads.title" />
                    </p>
                    <Rules
                      visibleItems={visibleRoads}
                      onToggle={toggleVisibleRoads}
                      allItemsVisible={allRoadsVisible}
                      totalItems={totalRoads}
                      defaultVisibleCount={DEFAULT_VISIBLE_RESTRICTIONS_COUNT}
                    />
                  </Col>
                )}
              </Row>
            </Col>
          )}
        </>
      )}
    </Row>
  );
};

RulesAndTravels.defaultProps = {
  onRef: undefined,
  isLoading: false,
};

RulesAndTravels.propTypes = {
  onRef: PropTypes.func,
  initialized: PropTypes.bool.isRequired,
  toggleVisibleRules: PropTypes.func.isRequired,
  allRulesVisible: PropTypes.bool.isRequired,
  totalRules: PropTypes.number.isRequired,
  visibleRules: PropTypes.arrayOf(PropTypes.shape).isRequired,
  toggleVisibleLocations: PropTypes.func.isRequired,
  allLocationsVisible: PropTypes.bool.isRequired,
  totalLocations: PropTypes.number.isRequired,
  visibleLocations: PropTypes.arrayOf(PropTypes.shape).isRequired,
  hasAvailableLocation: PropTypes.bool.isRequired,
  toggleVisibleRoads: PropTypes.func.isRequired,
  allRoadsVisible: PropTypes.bool.isRequired,
  totalRoads: PropTypes.number.isRequired,
  visibleRoads: PropTypes.arrayOf(PropTypes.shape).isRequired,
  hasAvailableRoad: PropTypes.bool.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
};

export default RulesAndTravels;
