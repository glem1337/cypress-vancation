/* eslint-disable react/prop-types */
import { Anchor, Button, Row, Col } from 'antd';
import classNames from 'classnames';

import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';

const { Link } = Anchor;

const NavHeader = ({ cardHidden }) => (
  <div className="van-details__nav-header">
    <div className="container">
      <Row gutter={24}>
        <Col xl={16}>
          <div className="overflow-hidden">
            <div className="d-flex align-items-flex-start justify-content-space-between">
              <p
                className="van-details__nav-title"
                title="Adventure Ready Class B Camper: 2020 Mercedes Sprinter Adventure Ready"
              >
                Adventure Ready Class B Camper: 2020 Mercedes Sprinter Adventure
                Ready
              </p>
              <div className="van-details__images-actions">
                <Button
                  type="text"
                  className="mr-16"
                  icon={<i className="icon icon-heart font-20" />}
                >
                  Save
                </Button>
                <Button
                  type="text"
                  icon={<i className="icon icon-share font-20" />}
                >
                  Share
                </Button>
              </div>
            </div>
            <Anchor targetOffset={160}>
              <Link href="#details-photos" title="Photos" />
              <Link href="#details-overview" title="Overview" />
              <Link href="#details-availability" title="Availability" />
              <Link href="#details-reviews" title="Reviews" />
              <Link href="#details-location" title="Location" />
            </Anchor>
          </div>
        </Col>
        <Col className="d-none d-xl-flex" xl={8}>
          <div
            className={classNames(
            'van-details__nav-header-card',
            !cardHidden && 'van-details__nav-header-card--hidden',
          )}
          >
            <div className="d-flex align-items-center">
              <i className="icon icon-flash-f mr-8 in-yellow-1000" />
              <p className="text-title">
                $375
                <span className="van-details__sticky-card-header-txt text-color-gray font-12 font-400">
                  / night
                </span>
              </p>
            </div>
            <MainBtnGradient
              size="large"
              className="min-w-140 ml-16"
              text="Instant book"
            />
          </div>
        </Col>
      </Row>
    </div>
  </div>
);

export default NavHeader;
