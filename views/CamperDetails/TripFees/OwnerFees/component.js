import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col } from 'antd';

import { CUSTOM_FEE_FREQUENCY_BY_TYPE } from 'constants/camperDetails';

const OwnerFees = ({
  cleaningFee,
  dumpingFee,
  fuelFee,
  lateDropOff,
  customFees,
}) => (
  <Col md={12}>
    <p className="text-headline mb-24">
      <FormattedMessage id="camperDetails.tripFees.ownerFees.title" />
    </p>
    <ul className="van-details__dotted-list pt-4">
      {Boolean(cleaningFee) && (
        <li className="in-black">
          <FormattedMessage
            id="camperDetails.tripFees.ownerFees.cleaning.cost"
            values={{
              cost: `$${cleaningFee}`,
            }}
          />
        </li>
      )}
      {Boolean(dumpingFee) && (
        <li className="in-black">
          <FormattedMessage
            id="camperDetails.tripFees.ownerFees.dumping.cost"
            values={{
              cost: `$${dumpingFee}`,
            }}
          />
        </li>
      )}
      {Boolean(fuelFee) && (
        <li className="in-black">
          <FormattedMessage
            id="camperDetails.tripFees.ownerFees.fuel.cost"
            values={{
              cost: `$${fuelFee}`,
            }}
          />
        </li>
      )}
      {Boolean(lateDropOff) && (
        <li className="in-black">
          <FormattedMessage
            id="camperDetails.tripFees.ownerFees.lateDropOff.cost"
            values={{
              cost: `$${lateDropOff}`,
            }}
          />
        </li>
      )}
      {customFees.map((item) => (
        <li key={item.id} className="in-black">
          {item.name}
          {' '}
          - $
          {item.price}
          {' '}
          <FormattedMessage {...CUSTOM_FEE_FREQUENCY_BY_TYPE[item.frequency]} />
        </li>
      ))}
    </ul>
  </Col>
);

OwnerFees.propTypes = {
  cleaningFee: PropTypes.number.isRequired,
  dumpingFee: PropTypes.number.isRequired,
  fuelFee: PropTypes.number.isRequired,
  lateDropOff: PropTypes.number.isRequired,
  customFees: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default OwnerFees;
