import { Col, Row } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { WORKS_CARDS } from 'constants/home';
import formatPhraseArrayGeneratorHelper from 'utils/formatPhraseArrayGeneratorHelper';
import ItemWithBlueColor from '../ItemWithBlueColor';

const Works = ({
 intl,
}) => (
  <div className="container home-inner-wrap">
    <div className="mb-40 mb-md-60">
      <h2 className="home__how-works-title">
        {formatPhraseArrayGeneratorHelper({
          tagName: 'color',
          phrase: intl.formatMessage({
            id: 'homePage.heroPageCard.title',
          }),
        }).map(ItemWithBlueColor)}
      </h2>
    </div>
    <Row justify="center">
      {WORKS_CARDS.map(({ icon, titleId, descriptionId }) => (
        <Col key={titleId.id} xl={6} className="home__how-works-card">
          <div className="home__how-works-card-inner">
            <div className="home__how-works-card-icon">
              <img src={`/images/home/${icon}.svg`} alt="" />
            </div>
            <div className="home__how-works-card-desc">
              <p className="mb-16 text-title">
                <FormattedMessage {...titleId} />
              </p>
              <p>
                <FormattedMessage {...descriptionId} />
              </p>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  </div>
);

Works.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default Works;
