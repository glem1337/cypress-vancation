import React from 'react';
import { Form, Col, Input, Row } from 'antd';
import LayoutListing from './LayoutListing';

const { TextArea } = Input;

const ListingDetails = () => (
  <LayoutListing withBackBtn>
    <Form layout="vertical">
      <Row>
        <Col span={24}>
          <h1 className="text-headline mb-8">
            Name and describe your listing
          </h1>
          <p className="mb-16">
            Catchy listing names are key to increasing
            views and bookings. Keep it short and unique.
          </p>
        </Col>
        <Col span={24}>
          <Row>
            <Col lg={16}>
              <Form.Item
                label={<span className="main-input__label">Listing name</span>}
                help={(
                  <p className="main-input__message">
                    <i className="main-input__message-icon icon icon-info" />
                    45/74 character maximum
                  </p>
                )}
              >
                <Input type="text" id="Listing" />
              </Form.Item>
            </Col>
            <Col lg={16}>
              <Form.Item
                label={<span className="main-input__label">Description (optional)</span>}
                help={(
                  <p className="main-input__message">
                    <i className="main-input__message-icon icon icon-info" />
                    85/2000 character maximum
                  </p>
                )}
              >
                <div className="main-input-textarea-wrap mb-0">
                  <TextArea
                    rows={4}
                    placeholder="Describe your listing"
                  />
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  </LayoutListing>
);

export default ListingDetails;
