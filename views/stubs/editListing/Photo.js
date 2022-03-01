import { Col, Row } from 'antd';
import PageLayout from './PageLayout';

const Photo = () => (
  <PageLayout hasFooter>
    <div className="container">
      <Row>
        <Col lg={16}>
          <h1 className="text-headline mb-8">
            Photos
          </h1>
          <p className="mb-24">
            Your camper photos are the most important part of your
            listing, we recommend uploading at least 5 photos to maximize bookings.
          </p>
        </Col>
        <Col span={24} />
      </Row>
    </div>
  </PageLayout>
);

export default Photo;
