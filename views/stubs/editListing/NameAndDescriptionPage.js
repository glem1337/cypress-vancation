import { Col, Input, Row, Form } from 'antd';
import PageLayout from './PageLayout';

const NameAndDescriptionPage = () => (
  <PageLayout hasFooter>
    <div className="container">
      <Row gutter={24}>
        <Col span={24}>
          <h1 className="text-headline mb-8">
            Name and describe your listing
          </h1>
          <p className="mb-24">
            Catchy listing names are key to increasing
            views and bookings. Keep it short and unique.
          </p>
        </Col>
        <Col span={24}>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col lg={16}>
                <div className="main-input--has-message mb-20">
                  <Form.Item
                    help={(
                      <p className="main-input__message">
                        <i className="main-input__message-icon icon icon-info" />
                        45/74 character maximum
                      </p>
                    )}
                    label={<span className="main-input__label">Listing name</span>}
                  >
                    <Input type="text" id="Listing" className="mb-0" />
                  </Form.Item>
                </div>
              </Col>
              <Col lg={16}>
                <div className="main-input--has-message mb-20">
                  <Form.Item
                    help={(
                      <p className="main-input__message">
                        <i className="main-input__message-icon icon icon-info" />
                        85/2000 character maximum
                      </p>
                    )}
                    label={<span className="main-input__label">Description (optional)</span>}
                  >
                    <div className="main-input-textarea-wrap mb-0">
                      <Input.TextArea rows={4} placeholder="Describe your listing" />
                    </div>
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  </PageLayout>
);

export default NameAndDescriptionPage;
