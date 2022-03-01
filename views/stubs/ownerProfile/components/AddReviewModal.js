import React from 'react';
import {
  Button, Checkbox, Input, Form, Radio,
} from 'antd';
import MainBtnGradient from '../../shared/buttons/MainBtnGradient';
import Modal from '../../shared/Modal';

const AddReviewModal = () => (
  <Modal className="main-modal main-modal--mob-full" closeIcon={null}>
    <Form layout="vertical">
      <div className="main-modal__container">
        <div className="main-modal__header">
          <h2 className="main-modal__title">
            Add a review
          </h2>
        </div>
        <div className="main-modal__body">
          <p className="mb-24">
            How was your experience renting to Stephen Buchanan?
          </p>
          <Form.Item className="mb-24">
            <Radio.Group size="large" className="d-flex justify-content-center">
              <Radio value="good" className="radio-review radio-review--good">
                <span className="radio-review__inner">
                  <img src="/images/Like - White.svg" alt="" />
                </span>
              </Radio>
              <Radio value="normal" className="radio-review radio-review--normal">
                <span className="radio-review__inner">
                  <img src="/images/smile.svg" alt="" />
                </span>
              </Radio>
              <Radio value="bad" className="radio-review radio-review--bad">
                <span className="radio-review__inner">
                  <img src="/images/Like - White.svg" alt="" />
                </span>
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <div className="main-input-textarea-wrap mb-0">
              <Input.TextArea
                rows={5}
                placeholder="Add a review"
              />
            </div>
          </Form.Item>
          {/* TODO: To FRONT_END  here must be this component
           views/AddNewCamper/Photos/component.js
           */}
          <Form.Item className="mb-0">
            <Checkbox>
              Leave private feedback for owner
            </Checkbox>
          </Form.Item>
          <Form.Item className="mb-0">
            <Input />
          </Form.Item>
        </div>
        <div className="main-modal__footer">
          <div className="ml-auto">
            <Button type="text" size="large">
              Cancel
            </Button>
            <MainBtnGradient
              className="min-w-140 ml-16"
              text="Leave a review"
              size="large"
            />
          </div>
        </div>
      </div>
    </Form>
  </Modal>
);

export default AddReviewModal;
