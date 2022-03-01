import {
 Col, Input, Radio, Row, Switch, Form,
} from 'antd';
import PageLayout from './PageLayout';

const Delivery = () => (
  <PageLayout hasFooter>
    <div className="container">
      <Form layout="vertical">
        <Row>
          <Col lg={16}>
            <h1 className="text-headline mb-8">
              Will you offer delivery?
            </h1>
            <p className="mb-24">
              If you offer delivery, renters can choose to have
              the campervan or RV delivered to a destination within an agreed distance.
            </p>
          </Col>
          <Col span={24}>
            <Row gutter={24}>
              <Col span={24}>
                <div className="mb-20">
                  <Form.Item>
                    <Switch />
                    <span className="ml-8">
                      I want to offer delivery
                    </span>
                  </Form.Item>
                </div>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Radio.Group defaultValue="a" size="large">
                    <div className="mb-20">
                      <Radio value="Free">
                        <span className="ml-12">Free delivery</span>
                      </Radio>
                    </div>
                    <div className="mb-20">
                      <Radio value="rates">
                        <span className="ml-12">Set delivery rates</span>
                      </Radio>
                    </div>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Row gutter={24}>
                  <Col md={12} lg={8}>
                    <div className="main-input-wrap-addtxt">
                      <Form.Item
                        label={<span className="main-input__label">Distance</span>}
                      >
                        <Input type="text" id="Cost" className="mb-20" />
                        <span className="main-input__add-txt">miles</span>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={12} lg={8}>
                <div className="main-input-wrap-addtxt">
                  <Form.Item
                    label={<span className="main-input__label"> Cost per mile</span>}
                  >
                    <Input type="text" id="Cost" className="mb-20" />
                    <span className="main-input__add-txt">per mile</span>
                  </Form.Item>
                </div>
              </Col>
              <Col md={12} lg={8}>
                <Form.Item
                  label={<span className="main-input__label">Minimum delivery fee</span>}
                >
                  <Input type="text" id="Minimum" className="mb-20" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  </PageLayout>
);

export default Delivery;
