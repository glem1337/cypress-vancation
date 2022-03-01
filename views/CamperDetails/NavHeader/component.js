import { Anchor, Button, Row, Col } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import BtnGradient from 'views/shared/BtnGradient';
import SkeletonText from 'views/shared/SkeletonText';
import useCamperPricesAndFees from 'utils/hooks/useCamperPricesAndFees';

const NavHeader = () => {
  const {
    isCamperExist,
    costPerNight,
    camper,
  } = useCamperPricesAndFees();

  const intl = useIntl();

  if (!isCamperExist) {
    return (
      <div className="van-details__nav-header">
        <div className="container">
          <Row gutter={24}>
            <Col xl={16}>
              <div className="overflow-hidden">
                <div className="d-flex align-items-flex-start justify-content-space-between">
                  <div className="skeleton__title w-100" />
                </div>
                <SkeletonText rows={1} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  return (
    <div className="van-details__nav-header">
      <div className="container">
        <Row gutter={24}>
          <Col xl={16}>
            <div className="overflow-hidden">
              <div className="d-flex align-items-flex-start justify-content-space-between">
                <p className="van-details__nav-title" title={camper?.name}>
                  {camper?.name}
                </p>
                <div className="van-details__images-actions">
                  <Button
                    type="text"
                    className="mr-16"
                    icon={<i className="icon icon-heart font-20" />}
                  >
                    <span>
                      <FormattedMessage id="shared.save" />
                    </span>
                  </Button>
                  <Button
                    type="text"
                    icon={<i className="icon icon-share font-20" />}
                  >
                    <span>
                      <FormattedMessage id="shared.share" />
                    </span>
                  </Button>
                </div>
              </div>
              <Anchor targetOffset={160}>
                <Anchor.Link
                  href="#details-photos"
                  title={intl.formatMessage({
                    id: 'shared.photos',
                  })}
                />
                <Anchor.Link
                  href="#details-overview"
                  title={intl.formatMessage({
                    id: 'shared.overview',
                  })}
                />
                <Anchor.Link
                  href="#details-availability"
                  title={intl.formatMessage({
                    id: 'shared.availability',
                  })}
                />
                <Anchor.Link
                  href="#details-location"
                  title={intl.formatMessage({
                    id: 'shared.location',
                  })}
                />
              </Anchor>
            </div>
          </Col>
          <Col className="d-none d-xl-flex" xl={8}>
            <div
              className="van-details__nav-header-card"
            >
              <div className="d-flex align-items-center">
                <i className="icon icon-flash-f mr-8 in-yellow-1000" />
                <p className="text-title">
                  {`$${costPerNight}`}
                  <span className="van-details__sticky-card-header-txt text-lowercase text-color-gray font-12 font-400">
                    /
                    {' '}
                    <FormattedMessage id="shared.night" />
                  </span>
                </p>
              </div>
              <BtnGradient
                size="large"
                className="min-w-140 ml-16"
                text={{
                  id: 'shared.instantBook',
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NavHeader;
