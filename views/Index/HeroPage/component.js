import { Col, Row } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { HERO_PAGE_CARDS } from 'constants/home';
import formatPhraseArrayGeneratorHelper from 'utils/formatPhraseArrayGeneratorHelper';
import ChooseDestinationWidget from 'views/shared/ChooseDestinationWidget';

import ItemWithBlueColor from '../ItemWithBlueColor';

import useContainer from './hook';

const HeroPage = (props) => {
  const { isChooseDestinationVisible } = props;

  const {
    intl,
    chooseDestinationRef,
  } = useContainer(props);

  return (
    <>
      <div className="home__first-block-wrap">
        <div className="container">
          <h1 className="home-title">
            {formatPhraseArrayGeneratorHelper({
              tagName: 'color',
              phrase: intl.formatMessage({
                id: 'homePage.title',
              }),
            }).map(ItemWithBlueColor)}
          </h1>
          <p className="home-txt">
            <FormattedMessage id="homePage.discoverAndBookAmazingCampervans" />
          </p>
        </div>
        <div
          className={classnames('choose-destination-home-wrapper', {
            'choose-destination-home-wrapper--hidden': !isChooseDestinationVisible,
          })}
          id="choose-destination-home-wrapper"
        >
          <ChooseDestinationWidget ref={chooseDestinationRef} />
        </div>
      </div>
      <div className="container home__pluses-card-wrap">
        <Row gutter={24}>
          {HERO_PAGE_CARDS.map(({ icon, color, titleId, descriptionId }) => (
            <Col key={titleId.id} xl={8} className="home__pluses-card">
              <div className="home__pluses-card-inner">
                <div className={`home__pluses-card-icon light-background--${color}`}>
                  <img src={`/images/home/${icon}.svg`} alt="" />
                </div>
                <div>
                  <p className="mb-8 text-subheader">
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
    </>
  );
};

HeroPage.propTypes = {
  isChooseDestinationVisible: PropTypes.bool.isRequired,
};

export default HeroPage;
