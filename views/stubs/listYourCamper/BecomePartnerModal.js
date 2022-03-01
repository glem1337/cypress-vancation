import { Button, Form, Input, Select } from 'antd';
import Modal from 'views/stubs/shared/Modal';
import React from 'react';
import MainBtnGradient from '../shared/buttons/MainBtnGradient';
import PhoneDropdown from '../shared/dropdowns/PhoneDropdown';

const { Option } = Select;

const BacomePartnerModal = () => (
  <Modal className="main-modal" closable={false}>
    <Form layout="vertical">
      <div className="main-modal__container">
        <div className="main-modal__header">
          <h2 className="main-modal__title">Become a Partner</h2>
        </div>
        <div className="main-modal__body">
          <Form.Item
            label={<span className="main-input__label">Business Name</span>}
          >
            <Input placeholder="Type business name" />
          </Form.Item>
          <Form.Item
            label={(
              <span className="main-input__label">
                How many campervans or RVs do you have?
              </span>
            )}
          >
            <Select
              className="main-input__field"
              optionLabelProp="label"
              placeholder="Select"
            >
              <Option className="p-0" value="1" label="1">
                <li className="main-dropdown__item">1</li>
              </Option>
              <Option className="p-0" value="2" label="2">
                <li className="main-dropdown__item">2</li>
              </Option>
              <Option className="p-0" value="3" label="3">
                <li className="main-dropdown__item">3</li>
              </Option>
            </Select>
          </Form.Item>
          <Form.Item label={<span className="main-input__label">Email</span>}>
            <Input placeholder="cory.hubbard@gmail.com" type="email" />
          </Form.Item>
          <Form.Item>
            <div className="d-flex align-items-center">
              <PhoneDropdown />
              <Input
                placeholder="1234567890"
                className="w-100 main-input__field--no-label"
              />
            </div>
          </Form.Item>
          <Form.Item>
            <div className="main-input-textarea-wrap mb-0">
              <Input.TextArea
                placeholder="Tell us about your business, share your website or social profile so we can check out what you're working on."
                rows={5}
              />
            </div>
          </Form.Item>
        </div>
      </div>
      <div className="main-modal__footer justify-content-flex-end">
        <Button type="text" size="large">
          Cancel
        </Button>
        <MainBtnGradient
          className="min-w-140 ml-16"
          text="Submit"
          size="large"
        />
      </div>
    </Form>
  </Modal>
);

export default BacomePartnerModal;
