import {
  Alert,
  Button,
  Col,
  Input,
  Radio,
  Row,
  Switch,
  Tag,
  Divider,
  Form,
} from 'antd';
import CustomFeesBlock from './components/CustomFeesBlock';
import LayoutListing from './LayoutListing';

const TripFees = () => (
  <LayoutListing>
    <Form layout="vertical">
      <Row>
        <Col lg={16}>
          <h1 className="text-headline mb-8">
            Trip fees
          </h1>
          <p className="mb-24">
            Set mileage, generator, and cleaning / prep fees.
          </p>
          <div className="mb-8 text-subheader font-700">
            Cleaning and preparation fee
          </div>
          <p className="mb-16">
            Set the amount charged to your renter for camper cleaning and preparation.
            Typically this fee includes standard cleaning, fuel and water fill up, grey
            water draining, battery storage is charged, etc.
          </p>
          <Row gutter={24}>
            <Col md={12}>
              <Form.Item
                label={<span className="main-input__label">Amount</span>}
              >
                <Input id="Amount" placeholder="$0" />
              </Form.Item>
            </Col>
            <Col md={21}>
              <Alert
                type="warning"
                className="mb-24"
                showIcon
                icon={<i className="icon icon-alert" />}
                message="Vancation recommends adding a cleaning and preparation fee of $50-100."
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider className="mt-0" />
      <Row>
        <Col span={24}>
          <Row>
            <Col lg={16}>
              <div className="mb-8 text-subheader font-700">
                Mileage
              </div>
              <p className="mb-24">
                How many miles can your renter drive per day?
              </p>
              <Form.Item>
                <Radio.Group defaultValue="a" size="large">
                  <div className="mb-20">
                    <Radio value="Free">
                      <span className="ml-12">
                        Allow unlimited miles
                      </span>
                    </Radio>
                  </div>
                  <div className="mb-20">
                    <Radio value="rates">
                      <span className="ml-12">
                        Limit the number of miles
                      </span>
                    </Radio>
                  </div>
                </Radio.Group>
              </Form.Item>
              <Row gutter={24}>
                <Col md={12}>
                  <div className="main-input-wrap-addtxt">
                    <Form.Item
                      label={<span className="main-input__label">Included miles</span>}
                    >
                      <Input id="Included" placeholder="0" />
                      <span className="main-input__add-txt">
                        per day
                      </span>
                    </Form.Item>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="main-input-wrap-addtxt">
                    <Form.Item
                      label={<span className="main-input__label">Overage charge</span>}
                    >
                      <Input id="Overage" placeholder="$0" />
                      <span className="main-input__add-txt">
                        per mile
                      </span>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <Row>
            <Col lg={16}>
              <div className="mb-8 text-subheader font-700">
                Generator rates
              </div>
              <p className="mb-24">
                If your vehicle has a generator please set your hourly usage rates here.
              </p>
              <div className="d-flex align-items-center mb-16">
                <Form.Item>
                  <Switch />
                  <span className="ml-8">My camper has a generator</span>
                </Form.Item>
              </div>
              <Form.Item>
                <Radio.Group defaultValue="a" size="large">
                  <div className="mb-20">
                    <Radio value="Free">
                      <span className="ml-12">Allow unlimited generator hours</span>
                      <Tag
                        className="mt-12 mt-md-0 ml-24 ml-md-8"
                        color="success"
                        icon={<i className="icon icon-like-f" />}
                      >
                        Vancation recommended
                      </Tag>
                    </Radio>
                  </div>
                  <div className="mb-20">
                    <Radio value="rates">
                      <span className="ml-12">Set my own hourly rate</span>
                    </Radio>
                  </div>
                </Radio.Group>
              </Form.Item>
              <Row gutter={24}>
                <Col md={12}>
                  <div className="main-input-wrap-addtxt">
                    <Form.Item
                      label={<span className="main-input__label">Included hours</span>}
                    >
                      <Input id="hours" placeholder="0" />
                      <span className="main-input__add-txt">per day</span>
                    </Form.Item>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="main-input-wrap-addtxt">
                    <Form.Item
                      label={<span className="main-input__label">Overage charge</span>}
                    >
                      <Input id="charge" placeholder="0" />
                      <span className="main-input__add-txt">per hours</span>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col lg={16}>
          <div className="mb-8 text-subheader font-400">
            Custom fees
          </div>
          <p className="mb-24">
            Add custom fees if you want.
          </p>
          <CustomFeesBlock />
          <CustomFeesBlock />
          <Button
            className="mb-24"
            type="secondary"
          >
            Add custom fee
          </Button>
        </Col>
      </Row>
    </Form>
  </LayoutListing>
);

export default TripFees;
