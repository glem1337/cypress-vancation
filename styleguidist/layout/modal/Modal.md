<a href="https://ant.design/components/modal/" title="More details about Ant modal">More details here</a>
<br />
<br />

<h3>Form input / Content edititng modals (L - Size - 740px)</h3>

 ```js
  import React, { useState } from 'react';
  import { Modal, Button, Upload, Input, Row, Col, Form } from 'antd';
  import { PlusOutlined } from '@ant-design/icons';

  const App = () => {
    const [visible, setVisible] = useState(false);
  
    return (
      <div>
        <Button type="primary" onClick={() => setVisible(true)}>
          Open Modal
        </Button>

        <Modal
          title="Modal Title"
          visible={visible}
          footer={[
            <Button type="link" key="back" onClick={() => setVisible(false)}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={() => setVisible(false)}>
              Done
            </Button>,
          ]}
          width={740}
        >
          <Form>
            <Row gutter={16}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 8 }}
              >
                <Upload
                  className="upload-modal"
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                >
                  <PlusOutlined />
                </Upload>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 16 }}
              >
                <p>Content description according to interface context</p>
                <Row gutter={16}>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 12 }}
                  >
                    <Form.Item label={`Test`}>
                      <Input
                        size="large"
                        placeholder="Placeholder"
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 12 }}
                  >
                    <Form.Item label={`Test`}>
                      <Input
                        size="large"
                        placeholder="Placeholder"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label={`Test`}>
                  <Input
                    size="large"
                    placeholder="Placeholder"
                  />
                </Form.Item>
                <Form.Item label={`Test`}>
                  <Input
                    size="large"
                    placeholder="Placeholder"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    )
  }
  
  <App />
```
<h3>Form input / Content edititng modals (M - Size - 558px)</h3>

```js
  import React, { useState } from 'react';
  import { Modal, Button, Input, Row, Col, Form } from 'antd';

  const App = () => {
    const [visible, setVisible] = useState(false);
  
    return (
      <div>
        <Button type="primary" onClick={() => setVisible(true)}>
          Open Modal
        </Button>

        <Modal
          title="Modal Title"
          visible={visible}
          footer={[
            <Button type="link" key="back" onClick={() => setVisible(false)}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={() => setVisible(false)}>
              Done
            </Button>,
          ]}
        >
          <p>Content description according to interface context</p>
          <Form>
            <Row gutter={16}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 12 }}
              >
                <Form.Item label={`Test`}>
                  <Input
                    size="large"
                    placeholder="Placeholder"
                  />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 12 }}
              >
                <Form.Item label={`Test`}>
                  <Input
                    size="large"
                    placeholder="Placeholder"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label={`Test`}>
              <Input
                size="large"
                placeholder="Placeholder"
              />
            </Form.Item>
            <Row gutter={16}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 18 }}
              >
                <Form.Item label={`Test`}>
                  <Input
                    size="large"
                    placeholder="Placeholder"
                  />
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 6 }}
              >
                <Form.Item label={`Test`}>
                  <Input
                    size="large"
                    placeholder="Placeholder"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    )
  }
  
  <App />
```
