import {
 Alert, Col, Input, Row, Form, Tooltip,
} from 'antd';
import CarCard from './components/CarCard';
import LayoutListing from './LayoutListing';

const Insurance = () => (
  <LayoutListing withBackBtn>
    <Row gutter={24}>
      <Col lg={16}>
        <h1 className="text-headline mb-16">
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
          <h2 className="text-subheader font-400 mb-16">
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
              <img src="/images/listing/insurance/Interior_Damage.svg" alt="" />
              <div className="ml-12">
                Includes interior damage + RV conversion work
              </div>
            </li>
            <li className="main-listing__insurance-item">
              <img src="/images/listing/insurance/Exterior_Damage.svg" alt="" />
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
          type="warning"
          className="mb-24"
          showIcon
          icon={<i className="icon icon-idea" />}
          message="All Renters must pass a Driver’s License verification and motor vehicle record safety check prior to booking. This is the safest RV rental marketplace out there."
        />
      </Col>
      <Col lg={16}>
        <h3 className="text-subheader font-700 mb-8">
          Refundable security deposit
        </h3>
        <p className="mb-16">
          We require a renter deposit amount equal to the insurance deductible
          to maintain a higher safety standard. The renter deposit is
          preauthorized prior to all bookings.
        </p>
      </Col>
      <div className="w-100" />
      <Col md={12} lg={8}>
        <Form layout="vertical">
          <Form.Item
            label={<span className="main-input__label">Deposit amount</span>}
            help={(
              <div className="main-input__message">
                <i className="main-input__message-icon icon icon-info" />
                Based on your insurance package selected the minimum deposit
                will be $300
              </div>
            )}
          >
            <Input defaultValue="$2,000" />
          </Form.Item>
        </Form>
      </Col>
    </Row>
    <CarCard isFloat />
  </LayoutListing>
);

export default Insurance;
