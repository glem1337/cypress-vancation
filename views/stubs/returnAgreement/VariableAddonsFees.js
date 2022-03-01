import {
 Col, Row, Form, Input, Divider, Select,
} from 'antd';
import LayoutListing from '../keyExchange/LayoutKeyExchange';
import TooltipIcon from '../shared/TooltipIcon';

const VariableAddonsFees = () => (
  <LayoutListing>
    <Form layout="vertical">
      <Row gutter={24}>
        <Col xl={16}>
          <h1 className="text-headline">Variable add-on fees</h1>
          <p className="mb-24">
            Amount charged is based on your rental/departure agreement.
          </p>
          <p className="text-subheader mb-8 font-700">Odometer</p>
          <p className="mb-16">
            Enter the vehicles odometer on drop-off, we recommend adding a
            photo.
          </p>
        </Col>
        <Col xl={16}>
          <Row gutter={24}>
            <Col md={12}>
              <Form.Item
                label={<span className="main-input__label">Start</span>}
              >
                <Input type="text" defaultValue="50,000" disabled />
                <span className="main-input__add-txt">miles</span>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item label={<span className="main-input__label">End</span>}>
                <Input type="text" placeholder="0" />
                <span className="main-input__add-txt">miles</span>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                label={
                  <span className="main-input__label">Included miles</span>
                }
              >
                <Input type="text" defaultValue="10" disabled />
                <span className="main-input__add-txt">miles</span>
              </Form.Item>
            </Col>
            <Col md={12}>
              <div className="main-input-wrap-addtxt d-flex align-items-center">
                <Form.Item
                  className="flex-grow-1"
                  label={(
                    <span className="main-input__label">
                      Mileage overage fee
                    </span>
                  )}
                >
                  <Input type="text" defaultValue="$0.5" disabled />
                  <span className="main-input__add-txt">per mile</span>
                </Form.Item>
                <TooltipIcon
                  className="edit-list__float-tooltip"
                  iconClass="icon-info-f"
                  phrase="some phrase"
                />
              </div>
            </Col>
            {/* TODO: Front-end part. Hide this col with button and show UploadWrap with Col */}
            <Col span={24}>
              <button type="button" className="main-link in-blue-1000 font-700">
                Add odometer meter photo
              </button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={24}>
            <Col span={24}>
              {/* TODO: To FRONT_END  here must be this component
           views/AddNewCamper/Photos/component.js
           */}
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Divider className="mt-24" />
        </Col>
        <Col xl={16}>
          <Row gutter={24}>
            <Col span={24}>
              <p className="text-subheader mb-8 font-700">Generator</p>
              <p className="mb-16">
                Enter the generators hour usage on drop-off.
              </p>
            </Col>
            <Col md={12}>
              <Form.Item
                label={<span className="main-input__label">Start</span>}
              >
                <Input type="text" defaultValue="10" disabled />
                <span className="main-input__add-txt">hours</span>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item label={<span className="main-input__label">End</span>}>
                <Input type="text" placeholder="0" />
                <span className="main-input__add-txt">hours</span>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                label={
                  <span className="main-input__label">Included hours</span>
                }
              >
                <Input type="text" defaultValue="5" disabled />
                <span className="main-input__add-txt">hours</span>
              </Form.Item>
            </Col>
            <Col md={12}>
              <div className="main-input-wrap-addtxt d-flex align-items-center">
                <Form.Item
                  className="flex-grow-1"
                  label={<span className="main-input__label">Overage fee</span>}
                >
                  <Input type="text" defaultValue="$3" disabled />
                  <span className="main-input__add-txt">per hour</span>
                </Form.Item>
                <TooltipIcon
                  className="edit-list__float-tooltip"
                  iconClass="icon-info-f"
                  phrase="some phrase"
                />
              </div>
            </Col>
            <Col span={24}>
              <button type="button" className="main-link in-blue-1000 font-700">
                Add generator meter photo
              </button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Divider className="mt-24" />
        </Col>
        <Col xl={16}>
          <Row gutter={24}>
            <Col span={24}>
              <p className="text-subheader mb-16 font-700">Fuel level</p>
            </Col>
            <Col md={12}>
              <Form.Item
                label={<span className="main-input__label">Start</span>}
              >
                <Input type="text" defaultValue="Full" disabled />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item label={<span className="main-input__label">End</span>}>
                <Select
                  className="main-input__field"
                  optionLabelProp="label"
                  placeholder="Select level"
                >
                  <Select.Option className="p-0" value="1" label="Full">
                    <li className="main-dropdown__item">Full</li>
                  </Select.Option>
                  <Select.Option className="p-0" value="2" label="Half">
                    <li className="main-dropdown__item">Half</li>
                  </Select.Option>
                  <Select.Option className="p-0" value="3" label="Empty">
                    <li className="main-dropdown__item">Empty</li>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                label={<span className="main-input__label">Refueling fee</span>}
              >
                <Input type="text" defaultValue="$15" disabled />
                <span className="main-input__add-txt">per quarter tank</span>
              </Form.Item>
            </Col>
            <Col span={24}>
              <button type="button" className="main-link in-blue-1000 font-700">
                Add fuel level photo
              </button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Divider className="mt-24" />
        </Col>
        <Col xl={16}>
          <Row gutter={24}>
            <Col span={24}>
              <p className="text-subheader mb-8 font-700">Waste tank</p>
              <p className="mb-16">
                Only add a dumping fee condition if renter hasn&apos;t already
                paid this fee.
              </p>
            </Col>
            <Col md={12}>
              <Form.Item
                label={<span className="main-input__label">Condition</span>}
              >
                <Select
                  className="main-input__field"
                  optionLabelProp="label"
                  placeholder="Select condition"
                >
                  <Select.Option className="p-0" value="select1" label="+1">
                    <li className="main-dropdown__item">Select condition 1</li>
                  </Select.Option>
                  <Select.Option className="p-0" value="select2" label="+2">
                    <li className="main-dropdown__item">Select condition 2</li>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12}>
              <div className="main-input-wrap-addtxt d-flex align-items-center">
                <Form.Item
                  className="flex-grow-1"
                  label={<span className="main-input__label">Dumping fee</span>}
                >
                  <Input type="text" defaultValue="$100" disabled />
                </Form.Item>
                <TooltipIcon
                  className="edit-list__float-tooltip"
                  iconClass="icon-info-f"
                  phrase="some phrase"
                />
              </div>
            </Col>
            <Col span={24}>
              <button type="button" className="main-link in-blue-1000 font-700">
                Add waste tank photo
              </button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Divider className="mt-24" />
        </Col>
        <Col xl={16}>
          <Row gutter={24}>
            <Col span={24}>
              <p className="text-subheader mb-8 font-700">
                Excessive cleaning fee
              </p>
              <p className="mb-16">
                Only add an excessive cleaning fee if it is well above and
                beyond normal cleaning requirements. Add photos in case of
                renter dispute.
              </p>
            </Col>
            <Col md={12}>
              <Form.Item
                label={<span className="main-input__label">Condition</span>}
              >
                <Select
                  className="main-input__field"
                  optionLabelProp="label"
                  placeholder="Select condition"
                >
                  <Select.Option className="p-0" value="select1" label="+1">
                    <li className="main-dropdown__item">Select condition 1</li>
                  </Select.Option>
                  <Select.Option className="p-0" value="select2" label="+2">
                    <li className="main-dropdown__item">Select condition 2</li>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                className="flex-grow-1"
                label={<span className="main-input__label">Cleaning fee</span>}
              >
                <Input type="text" defaultValue="$100" disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <button type="button" className="main-link in-blue-1000 font-700">
                Add photos
              </button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Divider className="mt-24" />
        </Col>
        <Col xl={16}>
          <Row gutter={24}>
            <Col span={24}>
              <p className="text-subheader mb-16 font-700">
                Excessively late drop-off fee
              </p>
            </Col>
            <Col md={12}>
              <Form.Item
                label={(
                  <span className="main-input__label">
                    Agreed on drop-off time
                  </span>
                )}
              >
                <Select
                  className="main-input__field"
                  optionLabelProp="label"
                  placeholder="Select condition"
                  defaultValue="11:00 AM"
                  disabled
                >
                  <Select.Option
                    className="p-0"
                    value="select1"
                    label="11:00 AM"
                  >
                    <li className="main-dropdown__item">11:00 AM</li>
                  </Select.Option>
                  <Select.Option
                    className="p-0"
                    value="select2"
                    label="12:00 AM"
                  >
                    <li className="main-dropdown__item">12:00 AM</li>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                label={(
                  <span className="main-input__label">
                    Actual drop-off time
                  </span>
                )}
              >
                <Select
                  className="main-input__field"
                  optionLabelProp="label"
                  placeholder="Select time"
                >
                  <Select.Option
                    className="p-0"
                    value="select1"
                    label="11:00 AM"
                  >
                    <li className="main-dropdown__item">11:00 AM</li>
                  </Select.Option>
                  <Select.Option
                    className="p-0"
                    value="select2"
                    label="12:00 AM"
                  >
                    <li className="main-dropdown__item">12:00 AM</li>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12}>
              <div className="main-input-wrap-addtxt d-flex align-items-center">
                <Form.Item
                  className="flex-grow-1"
                  label={(
                    <span className="main-input__label">
                      Excessively late drop-off fee
                    </span>
                  )}
                >
                  <Input type="text" placeholder="$0" disabled />
                </Form.Item>
                <TooltipIcon
                  className="edit-list__float-tooltip"
                  iconClass="icon-info-f"
                  phrase="some phrase"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  </LayoutListing>
);

export default VariableAddonsFees;
