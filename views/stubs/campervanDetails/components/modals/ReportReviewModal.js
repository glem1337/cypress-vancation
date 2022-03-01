import React from 'react';
import { Form, Button, Input, Radio } from 'antd';
import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import Modal from 'views/stubs/shared/Modal';

const ReportReviewModal = () => (
  <Modal className="main-modal" closeIcon={null}>
    <Form layout="vertical">
      <div className="main-modal__container">
        <div className="main-modal__header">
          <h2 className="main-modal__title">
            Report review
          </h2>
        </div>
        <div className="main-modal__body">
          <p className="mb-24">Please select the reporting reason and add the comment.</p>
          <Form.Item className="mb-0">
            <Radio.Group defaultValue={1} className="mb-8">
              <div className="mb-20">
                <Radio value={1}>
                  <span className="ml-12">Obscene language, insult or aggression</span>
                </Radio>
              </div>
              <div className="mb-20">
                <Radio value={2} className="ant-radio-centered">
                  <span className="ml-12">Spam (advertising)</span>
                </Radio>
              </div>
              <div className="mb-20">
                <Radio value={3} className="ant-radio-centered">
                  <span className="ml-12">Links to illegal sites or programs</span>
                </Radio>
              </div>
              <div className="mb-20">
                <Radio value={4} className="ant-radio-centered">
                  <span className="ml-12">Not relevant to the topic under discussion</span>
                </Radio>
              </div>
              <div className="mb-20">
                <Radio value={5} className="ant-radio-centered">
                  <span className="ml-12">Other</span>
                </Radio>
              </div>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Input />
          </Form.Item>
          <Form.Item className="mb-0">
            <div className="main-input-textarea-wrap mb-0">
              <Input.TextArea
                rows={5}
                placeholder="Add comment"
              />
            </div>
          </Form.Item>
        </div>
        <div className="main-modal__footer">
          <div className="ml-auto">
            <Button type="text" size="large">
              Cancel
            </Button>
            <MainBtnGradient
              className="min-w-140 ml-16"
              text="Report"
              size="large"
            />
          </div>
        </div>
      </div>
    </Form>
  </Modal>
);

export default ReportReviewModal;
