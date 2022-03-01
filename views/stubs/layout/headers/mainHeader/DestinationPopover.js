import { Row, Col, Divider } from 'antd';

const DestinationPopover = () => (
  <>
    <p className="text-title mb-24">Popular Destinations</p>
    <Row gutter={24}>
      <Col lg={8}>
        <p className="in-black font-600">States</p>
        <Divider className="mt-4 mb-16" />
        <Row gutter={24} className="mb-8">
          <Col span={12} md={6} lg={12}>
            <p className="mb-16 in-black">California</p>
            <p className="mb-16 in-black">Delaware</p>
            <p className="mb-16 in-black">Florida</p>
          </Col>
          <Col span={12} md={6} lg={12}>
            <p className="mb-16 in-black">Georgia</p>
            <p className="mb-16 in-black">Idaho</p>
            <p className="mb-16 in-black">Hawaii</p>
          </Col>
          <Col span={12} md={6} lg={12}>
            <p className="mb-16 in-black">Illinois</p>
            <p className="mb-16 in-black">Indiana</p>
            <p className="mb-16 in-black">Iowa</p>
          </Col>
          <Col span={12} md={6} lg={12}>
            <p className="mb-16 in-black">Kansas</p>
            <p className="mb-16 in-black">Kentucky</p>
            <p className="mb-16 in-black">Hawaii</p>
          </Col>
        </Row>
      </Col>
      <Col lg={8}>
        <p className="in-black font-600">Cities</p>
        <Divider className="mt-4 mb-16" />
        <Row gutter={24} className="mb-8">
          <Col span={12} md={6} lg={12}>
            <p className="mb-16 in-black">California</p>
            <p className="mb-16 in-black">Delaware</p>
            <p className="mb-16 in-black">Florida</p>
          </Col>
          <Col span={12} md={6} lg={12}>
            <p className="mb-16 in-black">Georgia</p>
            <p className="mb-16 in-black">Idaho</p>
            <p className="mb-16 in-black">Hawaii</p>
          </Col>
          <Col span={12} md={6} lg={12}>
            <p className="mb-16 in-black">Illinois</p>
            <p className="mb-16 in-black">Indiana</p>
            <p className="mb-16 in-black">Iowa</p>
          </Col>
          <Col span={12} md={6} lg={12}>
            <p className="mb-16 in-black">Kansas</p>
            <p className="mb-16 in-black">Kentucky</p>
            <p className="mb-16 in-black">Hawaii</p>
          </Col>
        </Row>
      </Col>
      <Col lg={8}>
        <p className="in-black font-600">National Parks</p>
        <Divider className="mt-4 mb-16" />
        <Row gutter={24} className="mb-8">
          <Col span={12} md={6} lg={12}>
            <p className="mb-16 in-black">California</p>
            <p className="mb-16 in-black">Delaware</p>
            <p className="mb-16 in-black">Florida</p>
          </Col>
          <Col span={12} md={6} lg={12}>
            <p className="mb-16 in-black">Georgia</p>
            <p className="mb-16 in-black">Idaho</p>
            <p className="mb-16 in-black">Hawaii</p>
          </Col>
          <Col span={12} md={6} lg={12}>
            <p className="mb-16 in-black">Illinois</p>
            <p className="mb-16 in-black">Indiana</p>
            <p className="mb-16 in-black">Iowa</p>
          </Col>
          <Col span={12} md={6} lg={12}>
            <p className="mb-16 in-black">Kansas</p>
            <p className="mb-16 in-black">Kentucky</p>
            <p className="mb-16 in-black">Hawaii</p>
          </Col>
        </Row>
      </Col>
    </Row>
    <div className="d-flex flex-column flex-md-row">
      <a href="" className="in-blue-1000 main-link mb-16 mb-md-0 mr-24 font-600">
        See all destinations
        <i className="icon icon-right ml-8 font-16" />
      </a>
      <a href="" className="in-blue-1000 main-link font-600">
        Camper rentals near me
        <i className="icon icon-right ml-8 font-16" />
      </a>
    </div>
  </>
);

export default DestinationPopover;
