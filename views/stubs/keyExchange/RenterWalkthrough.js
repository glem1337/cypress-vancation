import React from 'react';
import {
  Col, Row, Divider,
} from 'antd';
import LayoutListing from './LayoutKeyExchange';

const RenterWalkthrough = () => (
  <LayoutListing withBackBtn>
    <Row gutter={24}>
      <Col span={24}>
        <h1 className="text-headline mb-8">
          Renter walkthrough
        </h1>
        <p className="mb-24">
          Teach your renter to operate your campervan or RV.
        </p>
      </Col>
      <Col xl={16}>
        <div className="text-subheader mb-8 font-700">
          Training walkthrough
        </div>
        <p className="mb-24">
          You are responsible for ensuring your travelers have all the necessary knowledge to
          operate your campervan or RV.
        </p>
      </Col>
      <Col span={24}>
        <Row gutter={24}>
          <Col span={12} md={6}>
            <p className="mb-16 in-black">
              •
              {' '}
              Generator
            </p>
            <p className="mb-16 in-black">
              •
              {' '}
              Furniture
            </p>
            <p className="mb-16 in-black">
              •
              {' '}
              Inverter
            </p>
            <p className="mb-16 in-black">
              •
              {' '}
              Cleaning
            </p>
          </Col>
          <Col span={12} md={6}>
            <p className="mb-16 in-black">
              •
              {' '}
              Storage while traveling
            </p>
            <p className="mb-16 in-black">
              •
              {' '}
              Kitchen
            </p>
            <p className="mb-16 in-black">
              •
              {' '}
              Toilet
            </p>
            <p className="mb-16 in-black">
              •
              {' '}
              Water hookup
            </p>
          </Col>
          <Col span={12} md={6}>
            <p className="mb-16 in-black">
              •
              {' '}
              Swivel seats
            </p>
            <p className="mb-16 in-black">
              •
              {' '}
              Bathroom
            </p>
            <p className="mb-16 in-black">
              •
              {' '}
              Fluids
            </p>
            <p className="mb-16 in-black">
              •
              {' '}
              Shore power hookup
            </p>
          </Col>
          <Col span={12} md={6}>
            <p className="mb-16 in-black">
              •
              {' '}
              Water pump
            </p>
            <p className="mb-16 in-black">
              •
              {' '}
              Other
            </p>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Divider />
      </Col>
      <Col xl={16}>
        <div className="text-subheader mb-8 font-700">
          Setup lesson
        </div>
        <p className="mb-24">
          Please teach your renters each element of setting up and taking down camp with your
          campervan or RV. Again, be very thorough, and remember things that seem obvious to you may
          not be as obvious to your renters.
        </p>
        <p className="mb-24">
          It is important that you demonstrate and instruct on every element of setup and take down,
          but also allow the renters to do each step themselves under your close watch.
        </p>
        <p className="mb-24">
          This way, your renters will have the confidence and knowledge from having performed each
          task and you will be confident that they know what they are doing.
        </p>
      </Col>
      <Col span={24}>
        <Divider className="mt-0" />
      </Col>
      <Col xl={16}>
        <div className="text-subheader mb-8 font-700">
          Driving lesson
        </div>
        <p className="mb-24">
          Please note that failing to provide a driving lesson may nullify your case in the event of
          a disputed claim.
        </p>
      </Col>
      <Col span={24}>
        <Row gutter={24}>
          <Col span={12} md={6}>
            <p className="mb-16 in-black">
              •
              {' '}
              Engine starting
            </p>
            <p className="mb-16 in-black">
              •
              {' '}
              Reversing
            </p>
            <p className="mb-16 in-black">
              •
              {' '}
              Highway driving
            </p>
          </Col>
          <Col span={12} md={6}>
            <p className="mb-16 in-black">
              •
              {' '}
              Left turn
            </p>
            <p className="mb-16 in-black">
              •
              {' '}
              Appropriate speeds
            </p>
            <p className="mb-16 in-black">
              •
              {' '}
              Residential roads
            </p>
          </Col>
          <Col span={12} md={6}>
            <p className="mb-16 in-black">
              •
              {' '}
              Right turn
            </p>
            <p className="mb-16 in-black">
              •
              {' '}
              Gas station
            </p>
            <p className="mb-16 in-black">
              •
              {' '}
              Parking
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  </LayoutListing>
);

export default RenterWalkthrough;
