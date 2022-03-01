import { Row, Col, Select, Button } from 'antd';

const { Option } = Select;

const LeftSidebarMobile = () => (
  <div className="edit-list-left-sidebar-tab edit-departure-left-sidebar-tab">
    <Row>
      <Col>
        <div className="edit-departure-left-sidebar-tab__header">
          <Button
            className="mr-16"
            size="large"
            shape="circle"
            type="secondary"
            icon={(<i className="icon icon-cross in-blue-1000" />)}
          />
          <div className="text-subheader font-700">
            Edit Departure Agreement
          </div>
        </div>
      </Col>
      <Col md={12}>
        <Select
          id="Month"
          name="Month"
          className="main-input__field"
          optionLabelProp="label"
          placeholder="Edit Departure Agreement"
          defaultValue="Pricing"
        >
          <Option className="p-0" value="Pricing" label="Pricing & Availability">
            <li className="main-dropdown__item">Photos & Damage</li>
          </Option>
          <Option className="p-0" value="Name" label="Name and Description">
            <li className="main-dropdown__item">Final Condition Check</li>
          </Option>
          <Option className="p-0" value="Photos" label="Photos">
            <li className="main-dropdown__item">Renter Responsibilities</li>
          </Option>
        </Select>
      </Col>
    </Row>
  </div>
);

export default LeftSidebarMobile;
