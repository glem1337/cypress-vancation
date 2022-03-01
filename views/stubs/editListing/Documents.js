import { useState } from 'react';
import {
 Col, Row, Form, Button, Input, Checkbox, Upload, Divider,
} from 'antd';
import PageLayout from './PageLayout';
import RemoveQuestionModal from './components/RemoveQuestionModal';

const props = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  className: 'edit-listing-doc-upload',
  defaultFileList: [
    {
      uid: '1',
      name: 'Checklist.pdf',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png',
    },
    {
      uid: '2',
      name: 'Booking receipt.pdf',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    },
  ],
  showUploadList: {
    showRemoveIcon: true,
    removeIcon: <i className="icon icon-cross" />,
  },
};

const Documents = () => {
  const [visible, setVisible] = useState(false);
  const visibleToggle = () => setVisible((prev) => !prev);

  return (
    <PageLayout hasFooter>
      <div className="container">
        <Form layout="vertical">
          <Row>
            <Col lg={16}>
              <h2 className="text-headline mb-8">Additional documents</h2>
              <p className="mb-24">
                Upload additional documents, such as your company rental
                agreement and more. These will be sent to every renter upon
                booking.
              </p>
            </Col>
            <Col lg={16}>
              <Form.Item className="mb-0">
                <Upload {...props}>
                  <Button className="mt-8" type="secondary">
                    Upload document
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Divider className="mt-24 mb-24" />
            </Col>
            <Col lg={16}>
              <h2 className="text-headline mb-8">Renter checkout questions</h2>
              <p className="mb-24">
                Want to require specific questions for all renters to answer
                before booking? Add them here.
              </p>
              <div>
                <div className="custom-add-wrap custom-add-wrap--question">
                  <Form.Item
                    className="w-100 mb-8"
                    label={<span className="main-input__label">Question</span>}
                  >
                    <Input defaultValue="Why are you pick our company?" />
                  </Form.Item>
                  <Checkbox>Required to answer</Checkbox>
                  <div className="custom-acc-wrap__close">
                    <Button
                      type="secondary"
                      icon={<i className="icon icon-cross" />}
                      onClick={visibleToggle}
                    />
                  </div>
                </div>
              </div>
              <Button type="secondary">Add question</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <RemoveQuestionModal visible={visible} onClose={visibleToggle} />
    </PageLayout>
  );
};

export default Documents;
