import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import StickyHelpButton from '../shared/buttons/StickyHelpButton';

const FooterLinksBlock = ({ title, linkArray }) => (
  <div className="footer__list-block">
    <div className="footer__list-title">
      { title }
    </div>
    <ul>
      {linkArray.map((item) => (
        <li className="footer__list-link-wrap">
          <a className="footer__list-link" href={item.link}>{ item.txt }</a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => (
  <>
    <footer className="footer">
      <div className="container">
        <Row>
          <Col md={8} lg={4}>
            <div className="mb-24 mb-md-0">
              <img src="/images/logo/logo-white.svg" alt="" />
            </div>
          </Col>
          <Col span={12} md={8} lg={4}>
            <FooterLinksBlock
              title="For Owners"
              linkArray={[{ link: '/', txt: 'List your Camper' }, { link: '/', txt: 'Van Conversion Companies' }, {
                link: '/',
                txt: 'Affiliate Program',
              }]}
            />
          </Col>
          <Col span={12} md={8} lg={4}>
            <FooterLinksBlock
              title="For Renters"
              linkArray={[{ link: '/', txt: 'Rent a Campervan' }, { link: '/', txt: 'Road Trip Destinations' }, {
                link: '/',
                txt: 'Camper Rentals Near You',
              }]}
            />
          </Col>
          <Col span={12} md={{ span: 8, offset: 8 }} lg={{ span: 4, offset: 0 }}>
            <FooterLinksBlock
              title="Support"
              linkArray={[{ link: '/', txt: 'Help Center' }, { link: '/', txt: 'Insurance Coverage' }, {
                link: '/',
                txt: 'Roadside Assistance',
              }]}
            />
          </Col>
          <Col span={12} md={8} lg={4}>
            <FooterLinksBlock
              title="Contact Us"
              linkArray={[{
                link: 'mailto:support@vancation.com',
                txt: 'support@vancation.com',
              }, { link: 'tel:1-555-555-5555', txt: '1-555-555-5555' }, { link: '/', txt: 'Live Chat' }]}
            />
          </Col>
        </Row>
        <div className="footer-center">
          <div className="footer-center-left">
            <p className="mr-md-24">
              © 2020 Vancation. All rights reserved.
            </p>
            <div className="mb-24 mb-md-0">
              <a className="footer__list-link mr-24" href="">Terms of Service</a>
              <a className="footer__list-link" href="">Privacy Policy</a>
            </div>
          </div>
          <div className="footer-center-right">
            <p className="footer-center-right__txt">
              Currently Accepting Followers
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
    </footer>
    <div className="footer-bottom">
      <div className="container">
        <div className="d-flex align-items-center justify-content-space-between">
          <p>
            Built with ❤️ in beautiful Lake Tahoe.
          </p>
        </div>
      </div>
    </div>
    <StickyHelpButton icon="icon-message-f" />
  </>
);
/* eslint-disable import/prefer-default-export */
export {
  Footer,
};

FooterLinksBlock.propTypes = {
  title: PropTypes.string.isRequired,
  linkArray: PropTypes.shape().isRequired,
};
