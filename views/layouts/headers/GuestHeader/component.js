import { Col, Row } from 'antd';

import Logo from 'views/shared/Logo';

const GuestHeader = () => (
  <header>
    <Row justify="center">
      <Col md={23} lg={24}>
        <div className="auth-main__header-reset">
          <Logo isLink />
        </div>
      </Col>
    </Row>
  </header>
);

export default GuestHeader;
