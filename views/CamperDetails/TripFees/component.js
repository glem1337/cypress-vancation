import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import SkeletonText from 'views/shared/SkeletonText';
import Limits from './Limits';
import OwnerFees from './OwnerFees';

const TripFees = ({
  isCamperExist,
  isMileageLimited,
  availableMiles,
  overageMiles,
  hasGenerator,
  isGeneratorLimited,
  availableGeneratorHours,
  overageGenerator,
  cleaningFee,
  dumpingFee,
  fuelFee,
  lateDropOff,
  customFees,
  ownerFeesIsPresent,
}) => {
  if (!isCamperExist) {
    return (
      <Row gutter={24}>
        <Col md={12} className="mb-24 mb-md-0">
          <div className="skeleton__title w-100" />
          <SkeletonText rows={3} />
        </Col>
        <Col md={12}>
          <div className="skeleton__title w-100" />
          <SkeletonText rows={3} />
        </Col>
      </Row>
    );
  }

  return (
    <Row gutter={24}>
      <Limits
        isMileageLimited={isMileageLimited}
        availableMiles={availableMiles}
        overageMiles={overageMiles}
        hasGenerator={hasGenerator}
        isGeneratorLimited={isGeneratorLimited}
        availableGeneratorHours={availableGeneratorHours}
        overageGenerator={overageGenerator}
      />
      {ownerFeesIsPresent && (
        <OwnerFees
          cleaningFee={cleaningFee}
          customFees={customFees}
          dumpingFee={dumpingFee}
          fuelFee={fuelFee}
          lateDropOff={lateDropOff}
        />
      )}
    </Row>
  );
};

TripFees.propTypes = {
  isCamperExist: PropTypes.bool.isRequired,
  isMileageLimited: PropTypes.bool.isRequired,
  availableMiles: PropTypes.number.isRequired,
  overageMiles: PropTypes.number.isRequired,
  hasGenerator: PropTypes.bool.isRequired,
  isGeneratorLimited: PropTypes.bool.isRequired,
  availableGeneratorHours: PropTypes.number.isRequired,
  overageGenerator: PropTypes.number.isRequired,
  cleaningFee: PropTypes.number.isRequired,
  dumpingFee: PropTypes.number.isRequired,
  fuelFee: PropTypes.number.isRequired,
  lateDropOff: PropTypes.number.isRequired,
  customFees: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  ownerFeesIsPresent: PropTypes.bool.isRequired,
};

export default TripFees;
