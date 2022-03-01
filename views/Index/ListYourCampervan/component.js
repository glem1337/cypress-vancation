import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';

import BtnGradient from 'views/shared/BtnGradient';
import ROUTES from 'constants/routes';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import formatPhraseArrayGeneratorHelper from 'utils/formatPhraseArrayGeneratorHelper';
import ItemWithBlueColor from '../ItemWithBlueColor';

const ListYourCampervan = ({
  intl,
}) => (
  <div className="home-inner-wrap">
    <div className="container">
      <div className="home-profit">
        <Row justify="center">
          <Col md={22}>
            <div className="home-title mb-16 in-white">
              {formatPhraseArrayGeneratorHelper({
                tagName: 'color',
                phrase: intl.formatMessage({
                  id: 'homePage.listYourCampervan.title',
                }),
              }).map(ItemWithBlueColor)}
            </div>
          </Col>
          <Col md={16}>
            <p className="home-profit__txt">
              <FormattedMessage id="homePage.listYourCampervan.joinTheSafestCampervan" />
            </p>
          </Col>
          <Col span={24}>
            <Row justify="center">
              <Col md={8} xl={4}>
                <a
                  href={createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH, 'id')}
                  target="_blank"
                  rel="noreferrer"
                >
                  <BtnGradient
                    className="w-100"
                    text={<FormattedMessage id="shared.listYourCamper" />}
                    size="large"
                  />
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  </div>
);

ListYourCampervan.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default ListYourCampervan;
