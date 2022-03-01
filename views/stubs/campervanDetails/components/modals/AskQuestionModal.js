import React from 'react';
import { Form, Button, DatePicker, Input } from 'antd';
import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import Modal from 'views/stubs/shared/Modal';

const { RangePicker } = DatePicker;

const ReportReviewModal = () => (
  <Modal className="main-modal" closeIcon={null}>
    <Form layout="vertical">
      <div className="main-modal__container">
        <div className="main-modal__header">
          <h2 className="main-modal__title">
            Ask a question
          </h2>
        </div>
        <div className="main-modal__body">
          <Form.Item className="mb-0">
            <RangePicker
              className="two-section-rangepicker"
              suffixIcon={false}
              renderExtraFooter={() => <Button type="link" className="pl-0">Clear</Button>}
              format="MMM D, YYYY"
            />
          </Form.Item>
          <Form.Item className="mb-0">
            <div className="main-input-textarea-wrap mb-0">
              {/* TODO: To FRONT-END placeholder are uniq */}
              <Input.TextArea
                rows={5}
                placeholder="Ask Stephen a question"
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
              text="Send"
              size="large"
            />
          </div>
        </div>
      </div>
    </Form>
  </Modal>
);

export default ReportReviewModal;
