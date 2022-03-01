import {
 Col, Form, Input, Row, Divider, Alert, Select, Tooltip,
} from 'antd';
import PageLayout from './PageLayout';

const { Option } = Select;

const Insurance = () => (
  <PageLayout hasFooter>
    <div className="container">
      <Form layout="vertical">
        <Row gutter={24}>
          <Col lg={16}>
            <h1 className="text-headline mb-8">
              You’re protected! View protection plan details
            </h1>
            <Alert
              type="info"
              className="mb-24"
              showIcon
              icon={<i className="icon icon-info" />}
              message="Backed by Crum &#38; Forster Insurance with up to $1 million liability and up to $200,000 damage protection!"
            />
          </Col>
          <Col lg={12}>
            <div className="main-listing__insurance mb-16">
              <div className="main-listing__insurance-badge">
                <i className="icon icon-checked in-green-1000 mr-8" />
                <span className="in-black">Approved</span>
              </div>
              <h2 className="text-subheader font-400 mr-100 mb-16">
                Required Protection Plan
              </h2>
              <ul>
                <li className="main-listing__insurance-item">
                  <img
                    src="/images/listing/insurance/Insurance_Coverage.svg"
                    alt=""
                  />
                  <div className="ml-12">$1 Million Liability Protection</div>
                </li>
                <li className="main-listing__insurance-item">
                  <img
                    src="/images/listing/insurance/Damage_Protection.svg"
                    alt=""
                  />
                  <div className="ml-12">
                    Up To $200,000 Damage Protection
                    <Tooltip title="Some info">
                      <i className="icon icon-info-f main-tooltip-icon font-18" />
                    </Tooltip>
                  </div>
                </li>
                <li className="main-listing__insurance-item">
                  <img
                    src="/images/listing/insurance/Interior_Damage.svg"
                    alt=""
                  />
                  <div className="ml-12">
                    Includes interior damage + RV conversion work
                  </div>
                </li>
                <li className="main-listing__insurance-item">
                  <img
                    src="/images/listing/insurance/Exterior_Damage.svg"
                    alt=""
                  />
                  <div className="ml-12">Includes exterior damage</div>
                </li>
                <li className="main-listing__insurance-item">
                  <img
                    src="/images/listing/insurance/Roadside_Assistance.svg"
                    alt=""
                  />
                  <div className="ml-12">Roadside Assistance</div>
                </li>
                <li className="main-listing__insurance-item">
                  <img src="/images/listing/insurance/Support.svg" alt="" />
                  <div className="ml-12">24/7 Support</div>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={16}>
            <Alert
              className="mb-0"
              type="warning"
              showIcon
              icon={<i className="icon icon-idea" />}
              message="All Renters must pass a Driver’s License verification and motor vehicle record safety check prior to booking. This is the safest RV rental marketplace out there."
            />
          </Col>
          <Divider className="mt-24 mb-24" />
          <Col md={12} lg={8}>
            <h2 className="d-flex align-items-center text-subheader mb-16">
              Actual cash value
              <Tooltip title="Higher Actual Cash Value will cause your renters daily insurance rates to increase.">
                <i className="icon icon-info-f main-tooltip-icon" />
              </Tooltip>
            </h2>
            <Form.Item>
              <Input defaultValue="$17.000" />
            </Form.Item>
          </Col>
          <div className="w-100" />
          <Col lg={16}>
            <Alert
              className="mb-0"
              type="warning"
              showIcon
              icon={<i className="icon icon-idea" />}
              message="Entering a higher cash value for insurance will result in a much higher insurance premium for the renter and lead to fewer bookings for you. Only put in a value that is realistic to the actual cash value of your camper minus wear and tear/depreciation."
            />
          </Col>
          <Divider className="mt-24 mb-24" />
          <Col lg={16}>
            <h2 className="text-subheader mb-8">Vehicle info</h2>
            <p className="mb-16">
              Enter your VIN number, state registered and license plate number.
              This information is only shown to the insurance agency. No other
              third parties will be able to see your vehicle&apos;s private
              information.
            </p>
          </Col>
          <Col md={12}>
            <Form.Item
              label={
                <span className="main-input__label">VIN number (optional)</span>
              }
            >
              <Input defaultValue="48123658489411439" />
            </Form.Item>
          </Col>
          <Col md={16}>
            <Alert
              className="mb-24"
              type="warning"
              showIcon
              icon={<i className="icon icon-idea" />}
              message="Ensure your camper is fully covered by entering a valid VIN."
            />
          </Col>
          <div className="w-100" />
          <Col md={12} lg={8}>
            <Form.Item
              label={
                <span className="main-input__label">State registered</span>
              }
            >
              <Select
                className="main-input__field"
                optionLabelProp="label"
                defaultValue="California"
              >
                <Option className="p-0" value="California" label="California">
                  <li className="main-dropdown__item">California</li>
                </Option>
                <Option className="p-0" value="Texas" label="Texas">
                  <li className="main-dropdown__item">Texas</li>
                </Option>
                <Option className="p-0" value="Arizona" label="Arizona">
                  <li className="main-dropdown__item">Arizona</li>
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={12} lg={8}>
            <Form.Item
              label={<span className="main-input__label">License plate</span>}
            >
              <Input defaultValue="7TYP290" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  </PageLayout>
);

export default Insurance;
