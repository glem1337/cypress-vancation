import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Divider, Col, Row } from 'antd';

import HeaderUser from 'views/shared/UserHeader';
import SearchSection from 'views/Index/SearchSection';
import UserFooter from 'views/shared/UserFooter';

import NavHeader from './NavHeader';
import StickyCardBottom from './StickyCardBottom';
import TripFees from './TripFees';
import RulesAndTravels from './RulesAndTravels';
import Specifications from './Specifications';
import Policies from './Policies';
import HealthAndSafety from './HealthAndSafety';
import Amenities from './Amenities';
import Photos from './Photos';
import CalendarAvailability from './CalendarAvailability';
import Addons from './Addons';
import Location from './Location';
import OwnerProfile from './OwnerProfile';
import MainInfo from './MainInfo';
import NearbyLocations from './NearbyLocations';
import CamperPricesCard from './CamperPrices/Card';

const CamperDetails = ({
  camperId,
  active,
  isStartInputVisible,
  isChooseDestinationSmallVisible,
  onStartInputFocus,
  destinationsInputRef,
  headerRef,
  scrolled,
  camperPhoto,
  isDestinationParamsFilled,
}) => (
  <div
    className={classNames('van-details-wrap', {
      'van-details-wrap--scrolled': scrolled,
    })}
  >
    <HeaderUser
      groupItems={isDestinationParamsFilled}
      active={active}
      SearchSection={(
        <SearchSection
          isStartInputVisible={isStartInputVisible}
          isChooseDestinationVisible={isChooseDestinationSmallVisible}
          onStartInputFocus={onStartInputFocus}
          destinationsInputRef={destinationsInputRef}
          camperPhoto={camperPhoto}
        />
      )}
      ref={headerRef}
    />
    <NavHeader />
    <div>
      <Photos />
      <div className="container">
        <Row>
          <Col xl={16}>
            <MainInfo />
            <Specifications camperId={camperId} />
            <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
            <Amenities camperId={camperId} />
            <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
            <RulesAndTravels camperId={camperId} />
            <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
            <Row gutter={24}>
              <Policies camperId={camperId} />
              <HealthAndSafety camperId={camperId} />
            </Row>
            <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
            <TripFees camperId={camperId} />
            <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
            <Addons camperId={camperId} />
            <CalendarAvailability />
          </Col>
          <Col xl={8}>
            <CamperPricesCard />
          </Col>
        </Row>
        <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
      </div>
      <Location />
      <div className="container">
        <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
        <OwnerProfile camperId={camperId} />
        <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
        <NearbyLocations camperId={camperId} />
      </div>
    </div>
    <UserFooter />
    <StickyCardBottom />
  </div>
);

CamperDetails.defaultProps = {
  destinationsInputRef: undefined,
  headerRef: undefined,
};

CamperDetails.propTypes = {
  active: PropTypes.string.isRequired,
  isStartInputVisible: PropTypes.bool.isRequired,
  scrolled: PropTypes.bool.isRequired,
  isChooseDestinationSmallVisible: PropTypes.bool.isRequired,
  onStartInputFocus: PropTypes.func.isRequired,
  destinationsInputRef: PropTypes.shape(),
  headerRef: PropTypes.shape(),
  camperId: PropTypes.string.isRequired,
  camperPhoto: PropTypes.string.isRequired,
  isDestinationParamsFilled: PropTypes.bool.isRequired,
};

export default CamperDetails;
