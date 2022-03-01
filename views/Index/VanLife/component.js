import { Col, Row } from 'antd';
import { FormattedMessage } from 'react-intl';

const VanLife = () => (
  <div className="home-vanlife-wrap">
    <div className="container">
      <Row gutter={24}>
        <Col span={24}>
          <h2 className="home-title-sec mb-24 mb-md-40">
            <FormattedMessage id="homePage.vanLive.whatIsVanLife" />
          </h2>
        </Col>
        <Col xl={10}>
          <p className="text-subheader font-400">
            <FormattedMessage id="homePage.vanLive.vanLifeReallyIsNot" />
          </p>
        </Col>
        <Col xl={{ span: 10, offset: 2 }}>
          <p className="text-subheader font-400">
            <FormattedMessage id="homePage.vanLive.vancationWasBuiltByVanLifers" />
          </p>
        </Col>
      </Row>
    </div>
  </div>
);

export default VanLife;
