import { Row, Col, Select } from 'antd';

const { Option } = Select;

const LeftSidebarMobile = () => (
  <div className="edit-list-left-sidebar-tab">
    <Row>
      <Col md={12}>
        <Select
          id="Month"
          name="Month"
          className="main-input__field"
          optionLabelProp="label"
          placeholder="Select"
          defaultValue="Pricing"
        >
          <Option
            className="p-0"
            value="Pricing"
            label="Pricing &#38; Availability"
          >
            <li className="main-dropdown__item">Pricing &#38; Availability</li>
          </Option>
          <Option className="p-0" value="Name" label="Name and Description">
            <li className="main-dropdown__item">Name and Description</li>
          </Option>
          <Option className="p-0" value="Photos" label="Photos">
            <li className="main-dropdown__item">Photos</li>
          </Option>
          <Option className="p-0" value="Amenities" label="Amenities">
            <li className="main-dropdown__item">Amenities</li>
          </Option>
          <Option className="p-0" value="Camper" label="Camper Specifications">
            <li className="main-dropdown__item">Camper Specifications</li>
          </Option>
          <Option className="p-0" value="Add-ons" label="Add-ons">
            <li className="main-dropdown__item">Add-ons</li>
          </Option>
          <Option className="p-0" value="Insurance" label="Insurance">
            <li className="main-dropdown__item">Insurance</li>
          </Option>
          <Option className="p-0" value="Fees" label="Trip Fees">
            <li className="main-dropdown__item">Trip Fees</li>
          </Option>
          <Option className="p-0" value="Delivery" label="Delivery">
            <li className="main-dropdown__item">Delivery</li>
          </Option>
          <Option
            className="p-0"
            value="Rules"
            label="Rules &#38; Travel Restrictions"
          >
            <li className="main-dropdown__item">
              Rules &#38; Travel Restrictions
            </li>
          </Option>
          <Option className="p-0" value="Policies" label="Policies">
            <li className="main-dropdown__item">Booking Policies</li>
          </Option>
          <Option
            className="p-0"
            value="Documents"
            label="Additional Docs &#38; Questions"
          >
            <li className="main-dropdown__item">
              Additional Docs &#38; Questions
            </li>
          </Option>
        </Select>
      </Col>
    </Row>
  </div>
);

export default LeftSidebarMobile;
