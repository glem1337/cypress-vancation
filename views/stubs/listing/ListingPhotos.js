import { Col, Row } from 'antd';
import LayoutListing from './LayoutListing';

const ListingPhotos = () => (
  <LayoutListing withBackBtn>
    <Row>
      <Col span={24} lg={16}>
        <h1 className="text-headline mb-8">
          Add photos of your camper
        </h1>
        <p className="mb-24">
          Your camper photos are the most important part of your
          listing, we recommend uploading at least 5 photos to maximize bookings.
        </p>
      </Col>
      <Col span={24}>
        {/* TODO: To FRONT_END  here must be this component
           views/AddNewCamper/Photos/component.js
           */}
      </Col>
    </Row>
  </LayoutListing>
);

export default ListingPhotos;
