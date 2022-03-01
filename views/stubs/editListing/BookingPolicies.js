import {
  Col, Input, Radio, Row, Switch, Form, Tag, Divider, Alert, Select,
} from 'antd';
import PageLayout from './PageLayout';
import TooltipIcon from '../shared/TooltipIcon';

const { Option } = Select;

const BookingPolicies = () => (
  <PageLayout hasFooter>
    <div className="container">
      <Row>
        <Col span={24}>
          <h1 className="text-headline mb-8">
            Booking policies
          </h1>
          <p className="mb-24">
            Choose your default booking approval policy,
            cancellation policy and required security deposit.
          </p>
          <div className="mb-24 text-subheader font-700">
            Booking approval policy
          </div>
        </Col>
      </Row>
      <Form layout="vertical">
        <Row>
          <Col span={24}>
            <h1 className="text-headline mb-8">
              Last step! Let’s finish with your booking policies
            </h1>
            <p className="mb-24">
              Choose your default booking approval policy,
              cancellation policy and required security deposit.
            </p>
            <div className="mb-24 text-subheader font-700">
              Booking approval policy
            </div>
          </Col>
          <Col>
            <Row>
              <Col lg={12}>
                <Form.Item>
                  <Radio value="Instant" className="main-listing-radio">
                    <span>
                      <span className="main-listing-radio__title">
                        <i className="icon icon-flash-f in-yellow-1000 mr-12" />
                        <div className="d-inline-flex align-items-center flex-wrap">
                          <span className="mr-8">Instant book</span>
                          <Tag
                            className="mt-8 mt-md-0 ml-0"
                            color="cyan"
                            icon={<i className="icon icon-like-f" />}
                          >
                            Vancation recommended
                          </Tag>
                        </div>
                      </span>
                      <p>
                        Instant Booking gets you access to some great perks
                        at no additional cost. You’ll get an exclusive badge
                        on your listing, your market rank will increase,
                        and you’ll show up in more searches.
                      </p>
                    </span>
                  </Radio>
                </Form.Item>
                <div className="ml-24 ml-mb-40">
                  <Form.Item className="main-input--height-auto mb-8">
                    <Switch />
                    <span className="ml-8">
                      Booking request notice
                    </span>
                  </Form.Item>
                  <p className="mb-16">
                    Optional: You may auto block the calendar to avoid last minute
                    bookings that you might not be ready for. For example, if
                    &ldquo;2 days&ldquo; is selected it will prevent same day and next
                    day bookings.
                  </p>
                  <Row>
                    <Col md={16}>
                      <Form.Item
                        className="main-input--height-auto mb-16"
                        label={<span className="main-input__label">Days</span>}
                      >
                        <Select
                          id="Days"
                          name="Days"
                          className="main-input__field"
                          optionLabelProp="label"
                          defaultValue="4 nights"
                        >
                          <Option className="p-0" value="4 nights" label="4 nights">
                            <li className="main-dropdown__item">4 nights</li>
                          </Option>
                          <Option className="p-0" value="5 nights" label="5 nights">
                            <li className="main-dropdown__item">5 nights</li>
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Alert
                    type="warning"
                    className="mb-24"
                    showIcon
                    icon={<i className="icon icon-alert" />}
                    message="If a booking is made that is later than the Booking Request Notice deadline you will receive a 24 Hour Review inquiry instead."
                  />
                </div>
                <Form.Item>
                  <Radio value="review" className="main-listing-radio">
                    <span>
                      <span className="main-listing-radio__title">
                        24 hour review
                      </span>
                      <p>
                        Allow 24 hours to communicate with guests and accept booking requests.
                      </p>
                    </span>
                  </Radio>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Divider />
          <div className="mb-24 text-subheader font-700">
            Cancellation policy
            <TooltipIcon
              phrase="asd"
              iconClass="icon-info-f font-24"
            />
          </div>
          <Col>
            <Row>
              <Col lg={12}>
                <Form.Item>
                  <Radio.Group defaultValue="Easy" size="large">
                    <Radio value="Easy" className="main-listing-radio">
                      <span>
                        <span className="main-listing-radio__title">
                          <div className="d-inline-flex align-items-center flex-wrap">
                            <span className="mr-32 mr-md-8">Easy Going</span>
                            <Tag
                              className="ml-0"
                              color="success"
                              icon={<i className="icon icon-like-f" />}
                            >
                              Vancation recommended
                            </Tag>
                          </div>
                        </span>
                        <p>
                          Travelers who cancel at least 14 days before check-in will
                          get back 100% of the amount they&apos;ve paid.
                          If they cancel between 7 and 14 days
                          before check-in, they&apos;ll get back 50%.
                          Otherwise, they won&apos;t get a refund.
                        </p>
                      </span>
                    </Radio>
                    <Radio value="Firm" className="main-listing-radio">
                      <span>
                        <span className="main-listing-radio__title">
                          Firm but Fair
                        </span>
                        <p>
                          Travelers who cancel at least 30 days before check-in will
                          get back 100% of the amount they&apos;ve paid,
                          minus service fees. If they cancel between 14 and 30 days
                          before check-in, they&apos;ll get back 50%.
                          Otherwise, they won&apos;t get a refund.
                        </p>
                      </span>
                    </Radio>
                    <Radio value="Book" className="main-listing-radio">
                      <span>
                        <span className="main-listing-radio__title">
                          By the Book
                        </span>
                        <p>
                          Travelers who cancel at least 60 days before check-in
                          will get back 100% of the amount they&apos;ve paid.
                          If they cancel between 30 and 60 days before check-in,
                          they&apos;ll get back 50%. Otherwise, they won&apos;t get a refund.
                        </p>
                      </span>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Divider />
          <div className="mb-8 text-subheader font-700">
            Refundable security deposit
          </div>
          <Col span={24}>
            <Row>
              <Col md={16}>
                <p className="mb-16">
                  Add extra protection for your camper with a required security deposit.
                  We typically recommend leaving this as the same amount as the
                  insurance deductible. Excessively high deposits will lead to a
                  lower number of bookings for your camper.
                </p>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col md={12} lg={8}>
                <div className="mb-8">
                  <Form.Item
                    label={<span className="main-input__label">Deposit amount</span>}
                  >
                    <Input type="text" id="Deposit" value="$300" />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  </PageLayout>
);

export default BookingPolicies;
