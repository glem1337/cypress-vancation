import React from 'react';
import { Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

import { SUPPORT_EMAIL, SUPPORT_PHONE } from 'constants';
import ROUTES from 'constants/routes';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import FooterLinksBlock from './FooterLinksBlock';
import StickyHelpButton from './StickyHelpButton';

const Footer = () => (
  <div style={{ backgroundColor: '#327682' }}>
    <footer className="footer" id="footer">
      <div className="container">
        <Row>
          <Col md={8} lg={4}>
            <div className="mb-24 mb-md-0">
              <img src="/images/logo/logo-white.svg" alt="" />
            </div>
          </Col>
          <Col span={12} md={8} lg={4}>
            <FooterLinksBlock
              title={<FormattedMessage id="userHeader.forOwners" />}
              linkArray={[
                {
                  id: 1,
                  link: createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH, 'id'),
                  txt: <FormattedMessage id="shared.listYourCamper" />,
                  rel: 'noreferrer',
                  target: '_blank',
                },
                { id: 2, link: '/', txt: <FormattedMessage id="userHeader.vanConversionCompanies" /> },
                { id: 3, link: '/', txt: <FormattedMessage id="userHeader.affiliateProgram" /> },
              ]}
            />
          </Col>
          <Col span={12} md={8} lg={4}>
            <FooterLinksBlock
              title={<FormattedMessage id="userHeader.forRenters" />}
              linkArray={[
                { id: 4, link: '/', txt: <FormattedMessage id="userHeader.rentCampervan" /> },
                { id: 5, link: '/', txt: <FormattedMessage id="userHeader.roadTripDestinations" /> },
                { id: 6, link: '/', txt: <FormattedMessage id="userHeader.camperRentalsNearYou" /> },
              ]}
            />
          </Col>
          <Col span={12} md={{ span: 8, offset: 8 }} lg={{ span: 4, offset: 0 }}>
            <FooterLinksBlock
              title={<FormattedMessage id="shared.support" />}
              linkArray={[
                { id: 7, link: '/', txt: <FormattedMessage id="userHeader.helpCenter" /> },
                { id: 8, link: '/', txt: <FormattedMessage id="userHeader.insuranceCoverage" /> },
                { id: 9, link: '/', txt: <FormattedMessage id="userHeader.roadsideAssistance" /> },
              ]}
            />
          </Col>
          <Col span={12} md={8} lg={4}>
            <FooterLinksBlock
              title={<FormattedMessage id="userHeader.contactUs" />}
              linkArray={[
                {
                  id: 10,
                  link: `mailto:${SUPPORT_EMAIL}`,
                  txt: SUPPORT_EMAIL,
                },
                { id: 11, link: `tel:${SUPPORT_PHONE}`, txt: SUPPORT_PHONE },
                { id: 12, link: '/', txt: <FormattedMessage id="userHeader.liveChat" /> },
              ]}
            />
          </Col>
        </Row>
        <div className="footer-center">
          <div className="footer-center-left">
            <p className="mr-md-24">
              <FormattedMessage id="shared.allRightReserved" values={{ year: new Date().getFullYear() }} />
            </p>
            <div className="mb-24 mb-md-0">
              <Link href={ROUTES.TERMS_OF_SERVICE.PATH}>
                <a
                  className="footer__list-link mr-24"
                  rel="noreferrer"
                  target="_blank"
                >
                  <FormattedMessage id="shared.termsOfService" />
                </a>
              </Link>
              <Link href={ROUTES.PRIVACY_POLICY.PATH}>
                <a
                  className="footer__list-link"
                  rel="noreferrer"
                  target="_blank"
                >
                  <FormattedMessage id="shared.privacyPolicy" />
                </a>
              </Link>
            </div>
          </div>
          <div className="footer-center-right">
            <p className="footer-center-right__txt">
              <FormattedMessage id="userHeader.currentlyAcceptingFollowers" />
            </p>
            <div>
              <a className="footer-center__social-link" href="">
                <i className="icon icon-facebook-circle" />
              </a>
              <a className="footer-center__social-link" href="">
                <i className="icon icon-instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="d-flex align-items-center justify-content-space-between">
            <p>
              <FormattedMessage id="shared.buildInFooter" />
            </p>
          </div>
        </div>
      </div>
    </footer>
    <StickyHelpButton icon="icon-message-f" />
  </div>
);

export default Footer;
