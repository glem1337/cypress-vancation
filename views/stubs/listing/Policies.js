import {
  Col,
  Radio,
  Row,
  Tag,
  Input,
  Divider,
  Form,
} from 'antd';
import TooltipIcon from '../shared/TooltipIcon';
import LayoutListing from './LayoutListing';

const Policies = () => (
  <LayoutListing withBackBtn>
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
                <Radio.Group defaultValue="Instant" size="large">
                  <Radio value="Instant" className="main-listing-radio">
                    <span>
                      <span className="main-listing-radio__title">
                        <i className="icon icon-flash-f in-yellow-1000 mr-12" />
                        <div className="d-inline-flex flex-column flex-md-row align-items-md-center flex-wrap">
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
                      <p className="text-body">
                        Instant Booking gets you access to some great perks
                        at no additional cost. You’ll get an exclusive badge
                        on your listing, your market rank will increase,
                        and you’ll show up in more searches.
                      </p>
                    </span>
                  </Radio>
                  <Radio value="review" className="main-listing-radio">
                    <span>
                      <span className="main-listing-radio__title">
                        24 hour review
                      </span>
                      <p className="text-body">
                        Allow 24 hours to communicate with guests and accept booking requests.
                      </p>
                    </span>
                  </Radio>
                </Radio.Group>
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
                        <div className="d-inline-flex flex-column flex-md-row align-items-md-center flex-wrap">
                          <span className="mr-32 mr-md-8">Easy Going</span>
                          <Tag
                            className="mt-8 mt-md-0 ml-0"
                            color="cyan"
                            icon={<i className="icon icon-like-f" />}
                          >
                            Vancation recommended
                          </Tag>
                        </div>
                      </span>
                      <p className="text-body">
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
                      <p className="text-body">
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
                      <p className="text-body">
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
  </LayoutListing>
);

export default Policies;
