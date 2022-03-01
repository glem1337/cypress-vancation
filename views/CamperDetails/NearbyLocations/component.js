import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import isPresent from 'utils/isPresent';
import { createCampervanRentalRoute } from 'utils/createRouteHelper';

import SkeletonTitle from 'views/shared/SkeletonTitle';
import SkeletonText from 'views/shared/SkeletonText';

const NearbyLocations = ({
  initialized,
  onRef,
  isCamperExist,
  isLoading,
  locations,
}) => {
  if (!isCamperExist || isLoading) {
    return (
      <div ref={onRef} className="mb-24 mb-md-36">
        <SkeletonTitle />
        <SkeletonText />
      </div>
    );
  }

  if (!isPresent(locations) && initialized) {
    return null;
  }

  return (
    <div ref={onRef} className="mb-24 mb-md-36">
      {initialized && (
        <>
          <p className="text-headline mb-24 mb-md-40">
            <FormattedMessage id="shared.exploreCamperRentalsNearby" />
          </p>
          <Row gutter={24}>
            {locations.map((location) => (
              <Col key={location.id} span={12} md={8} xl={4}>
                <a
                  href={createCampervanRentalRoute({
                    state: location.stateSlug,
                    location: location.landingSlug,
                  })}
                  className="main-link d-inline-block mb-16 mb-md-24 text-subheader font-400"
                  target="_blank"
                  rel="noreferrer"
                >
                  {location.landingName}
                </a>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

NearbyLocations.defaultProps = {
  onRef: undefined,
  isLoading: false,
};

NearbyLocations.propTypes = {
  onRef: PropTypes.func,
  isLoading: PropTypes.bool,
  initialized: PropTypes.bool.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default NearbyLocations;
