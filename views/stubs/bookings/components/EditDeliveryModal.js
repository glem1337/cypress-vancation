/* eslint-disable react/prop-types */
import {
 Form, Button, Select, AutoComplete, Input,
} from 'antd';
import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import Modal from 'views/stubs/shared/Modal';

const { Option } = Select;

const EditDeliveryModal = ({ visible, onClose }) => (
  <Modal
    className="main-modal"
    visible={visible}
    onClose={onClose}
    closable={false}
  >
    <div className="main-modal__container">
      <Form layout="vertical">
        <div className="main-modal__header">
          <h2 className="main-modal__title">Edit delivery details</h2>
        </div>
        <div className="main-modal__body">
          <div className="d-flex">
            <Form.Item
              className="flex-1"
              label={<span className="main-input__label">Pickup time</span>}
            >
              <Select
                className="main-input__field"
                optionLabelProp="label"
                placeholder="Select"
                defaultValue="1"
              >
                <Option className="p-0" value="1" label="4:00 PM">
                  <li className="main-dropdown__item">4:00 PM</li>
                </Option>
                <Option className="p-0" value="2" label="11:00 AM">
                  <li className="main-dropdown__item">11:00 AM</li>
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              className="flex-1 ml-24"
              label={<span className="main-input__label">Drop-off time</span>}
            >
              <Select
                className="main-input__field"
                optionLabelProp="label"
                placeholder="Select"
                defaultValue="2"
              >
                <Option className="p-0" value="1" label="4:00 PM">
                  <li className="main-dropdown__item">4:00 PM</li>
                </Option>
                <Option className="p-0" value="2" label="11:00 AM">
                  <li className="main-dropdown__item">11:00 AM</li>
                </Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            label={<span className="main-input__label">Pickup address</span>}
          >
            <AutoComplete
              allowClear
              defaultValue="1352 Naped Street, Los Angeles"
            >
              <Input
                prefix={<i className="icon icon-location" />}
                placeholder="Location"
              />
            </AutoComplete>
          </Form.Item>
          <Form.Item
            className="mb-0"
            label={<span className="main-input__label">Drop-off address</span>}
          >
            <AutoComplete
              allowClear
              defaultValue="1352 Naped Street, Los Angeles"
            >
              <Input
                prefix={<i className="icon icon-location" />}
                placeholder="Location"
              />
            </AutoComplete>
          </Form.Item>
        </div>
        <div className="main-modal__footer justify-content-flex-end">
          <Button type="text" size="large" onClick={onClose}>
            Cancel
          </Button>
          <MainBtnGradient
            className="min-w-140 ml-16"
            text="Save"
            size="large"
          />
        </div>
      </Form>
    </div>
  </Modal>
);

export default EditDeliveryModal;
