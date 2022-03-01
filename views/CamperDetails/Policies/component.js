import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'antd';

import {
  DEFAULT_MIN_NIGHT_STAY,
  POLICIES_FORM_DEFAULT_VALUES,
} from 'constants/camper';

import TooltipIcon from 'views/shared/TooltipIcon';
import SkeletonText from 'views/shared/SkeletonText';

const Policies = ({
  onRef,
  cancellationPolicy: { title, description },
  isCamperExist,
  isLoading,
}) => {
  if (!isCamperExist || isLoading) {
    return (
      <Col ref={onRef} md={12} className="mb-24 mb-md-0">
        <div className="skeleton__title w-100" />
        <SkeletonText />
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
    );
  }

  return (
    <Col ref={onRef} md={12} className="mb-24 mb-md-0">
      <p className="text-headline mb-24">
        <FormattedMessage id="shared.policies" />
      </p>
      <p className="mb-8">
        <FormattedMessage id="addNewCamper.policies.cancellationTitle" />
      </p>
      <p className="text-subheader mb-8 in-blue-1000 font-400">
        <FormattedMessage {...title} />
      </p>
      <p className="mb-24">
        <FormattedMessage {...description} />
      </p>
      <Row gutter={24}>
        <Col span={12}>
          <p className="mb-8">
            <FormattedMessage id="shared.minStay" />
          </p>
          <p className="text-subheader font-700">
            <FormattedMessage
              id="addNewCamper.pricing.countOfNights"
              // TODO - Show default value if dates not chosen.
              // TODO - If dates chosen, then show minimum for period
              values={{
                count: DEFAULT_MIN_NIGHT_STAY,
              }}
            />
          </p>
        </Col>
        <Col span={12}>
          <div className="d-flex mb-8">
            <p>
              <FormattedMessage id="addNewCamper.insurance.refundable.title" />
            </p>
            <TooltipIcon
              phrase={(
                <FormattedMessage
                  id="camperDetails.policies.tooltip"
                  values={{
                    price: `$${POLICIES_FORM_DEFAULT_VALUES.DEPOSIT}`,
                  }}
                />
              )}
              iconClass="icon-info-f"
            />
          </div>
          <p className="text-subheader font-700">
            $
            {POLICIES_FORM_DEFAULT_VALUES.DEPOSIT}
          </p>
        </Col>
      </Row>
    </Col>
  );
};

Policies.defaultProps = {
  onRef: undefined,
  isLoading: false,
};

Policies.propTypes = {
  onRef: PropTypes.func,
  cancellationPolicy: PropTypes.shape().isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
};

export default Policies;
