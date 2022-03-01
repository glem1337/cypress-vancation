import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col } from 'antd';

const Limits = ({
  isMileageLimited,
  availableMiles,
  overageMiles,
  hasGenerator,
  isGeneratorLimited,
  availableGeneratorHours,
  overageGenerator,
}) => (
  <Col md={12} className="mb-24 mb-md-0">
    <p className="text-headline mb-24">
      <FormattedMessage id="camperDetails.tripFees.limits.title" />
    </p>
    <div className="d-flex align-items-center mb-10">
      <img
        className="mr-10"
        src="/images/edit_listing/rules/Allow-Unlimited-Miles.svg"
        alt=""
      />
      <p className="text-subheader font-700 text-capitalize">
        <FormattedMessage id="shared.miles" />
        :
      </p>
    </div>
    <ul className="van-details__dotted-list pl-10 pl-md-40 mb-24">
      {isMileageLimited ? (
        <>
          <li className="in-black">
            {availableMiles}
            {' '}
            <FormattedMessage id="camperDetails.tripFees.miles.perDay" />
          </li>
          <li className="in-black">
            <FormattedMessage
              id="camperDetails.tripFees.miles.overage"
              values={{
                cost: `$${overageMiles}`,
              }}
            />
          </li>
        </>
      ) : (
        <li className="in-black">
          <FormattedMessage id="camperDetails.tripFees.miles.unlimited" />
        </li>
      )}
    </ul>
    {hasGenerator && (
      <>
        <div className="d-flex align-items-center mb-10">
          <i className="icon icon-flash-f mr-10 in-black" />
          <p className="text-subheader font-700">
            <FormattedMessage id="camperDetails.tripFees.generator.title" />
            :
          </p>
        </div>
        <ul className="van-details__dotted-list pl-10 pl-md-40">
          {isGeneratorLimited ? (
            <>
              <li className="in-black">
                {availableGeneratorHours}
                {' '}
                <FormattedMessage id="camperDetails.tripFees.generator.perDay" />
              </li>
              <li className="in-black">
                <FormattedMessage
                  id="camperDetails.tripFees.generator.overage"
                  values={{
                    cost: `$${overageGenerator}`,
                  }}
                />
              </li>
            </>
          ) : (
            <li className="in-black">
              <FormattedMessage id="camperDetails.tripFees.generator.unlimited" />
            </li>
          )}
        </ul>
      </>
    )}
  </Col>
);

Limits.propTypes = {
  isMileageLimited: PropTypes.bool.isRequired,
  availableMiles: PropTypes.number.isRequired,
  overageMiles: PropTypes.number.isRequired,
  hasGenerator: PropTypes.bool.isRequired,
  isGeneratorLimited: PropTypes.bool.isRequired,
  availableGeneratorHours: PropTypes.number.isRequired,
  overageGenerator: PropTypes.number.isRequired,
};

export default Limits;
