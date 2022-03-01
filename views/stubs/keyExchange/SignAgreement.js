import React from 'react';
import {
  Col, Row,
} from 'antd';
import LayoutListing from './LayoutKeyExchange';

const SignAgreement = () => (
  <LayoutListing withBackBtn>
    <Row gutter={24} className="h-100">
      <Col xl={16}>
        <h1 className="text-headline mb-8">
          Sign departure agreement
        </h1>
        <p className="mb-24">
          This form must be completed for quality assurance, insurance protection, and to ensure the
          best possible owner and renter experience.
        </p>
      </Col>
      <Col span={24} className="pdf-wrap">
        <iframe
          className="w-100 h-100"
          title="pdf"
          src="http://www.africau.edu/images/default/sample.pdf"
          frameBorder="0"
        />
      </Col>
    </Row>
  </LayoutListing>
);

export default SignAgreement;
