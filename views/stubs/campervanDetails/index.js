import { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Tag,
  Divider,
  Button,
  Avatar,
  Tooltip,
  DatePicker,
} from 'antd';
import classNames from 'classnames';

import { Footer } from '../layout/Footer';
import Header from '../layout/headers/mainHeader/Header';
import Gallery from './components/Gallery';
import TooltipIcon from '../shared/TooltipIcon';
import AmenitiesBlock from './components/AmenitiesBlock';
import ReviewItem from './components/ReviewItem';
import SliderFavorite from '../home/components/SliderFavorite';
import MainBtnGradient from '../shared/buttons/MainBtnGradient';
import NavHeader from './components/NavHeader';
import StickyInfoCard from './components/StickyInfoCard';
import StickyCardBottom from './components/StickyCardBottom';

const { RangePicker } = DatePicker;

const detailsArr = [
  {
    icon: 'details_camp/Sleeps',
    title: 'Sleeps',
    txt: '2',
    withTooltip: false,
  },
  {
    icon: 'details_camp/Seats',
    title: 'Seats',
    txt: '3',
    withTooltip: true,
  },
  {
    icon: 'listing/High-Top',
    title: 'Inside height',
    txt: 'High Top',
    withTooltip: true,
  },
  {
    icon: 'details_camp/Length',
    title: 'Length',
    txt: 'Long',
    withTooltip: true,
  },
  {
    icon: 'details_camp/Transmission',
    title: 'Transmission',
    txt: 'Automatic',
    withTooltip: false,
  },
  {
    icon: 'edit_listing/rules/Allow-Unlimited-Miles',
    title: 'Current mileage',
    txt: 'Under 50,000',
    withTooltip: false,
  },
  {
    icon: 'details_camp/Fuel-Type',
    title: 'Fuel type',
    txt: 'Diesel',
    withTooltip: false,
  },
  {
    icon: 'edit_listing/rules/4x4-Only-Roads',
    title: 'Drivetrain',
    txt: '4x4/AWD',
    withTooltip: false,
  },
  {
    icon: 'details_camp/Fresh-Water',
    title: 'Fresh water',
    txt: '21 gal',
    withTooltip: false,
  },
  {
    icon: 'details_camp/Gray-Water',
    title: 'Gray water',
    txt: '21 gal',
    withTooltip: true,
  },
];

const rentalsNearby = [
  'Kasivnuc',
  'Pirosvuf',
  'Laitad',
  'Bilarejen',
  'Godmucal',
  'Zorufiva',
  'Bovfekir',
  'Genowum',
  'Nakobat',
  'Ruladufoh',
  'Natnapup',
  'Kuhosim',
];

/* TODO: To FRONT-END , use van-details__unavailable-item class for line-through item */

const CampervanDetails = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cardHidden, setCardHidden] = useState(false);

  useEffect(() => {
    const handler = () => {
      const { scrollY } = window;
      // these are dummy values, the actual ones must be calculated
      setScrolled(scrollY >= 420);
      setCardHidden(scrollY >= 3725);
    };
    window.addEventListener('scroll', handler);
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div
      className={classNames(
        'van-details-wrap',
        scrolled && 'van-details-wrap--scrolled',
      )}
    >
      <Header />
      <NavHeader cardHidden={cardHidden} />
      <div>
        <Gallery />
        <div className="container">
          <Row>
            <Col xl={16}>
              <div className="van-details__name-wrap">
                <h1 className="main-title mb-16">
                  Adventure Ready Class B Camper: 2020 Mercedes Sprinter
                  Winnebago Revel 4x4
                </h1>
                <div className="van-details__tags-wrap">
                  <div className="tag-glamper mr-8">
                    <img
                      className="mr-4"
                      src="/images/profile/Diamond-White.svg"
                      alt=""
                    />
                    Glamper
                  </div>
                  <Tag
                    className="mr-8"
                    color="default"
                    icon={<i className="icon icon-delivery in-black" />}
                  >
                    <span className="in-black">DELIVERY - 10 MILES</span>
                  </Tag>
                  <Tag
                    className="mr-8"
                    color="default"
                    icon={(
                      <img
                        className="mr-4"
                        src="/images/details_camp/Off-Grid Capable.svg"
                        alt=""
                      />
                    )}
                  >
                    <span className="in-black">OFF-GRID CAPABLE</span>
                  </Tag>
                  <Tag
                    className="mr-8"
                    color="default"
                    icon={(
                      <img
                        className="van-details__miles-tag"
                        src="/images/edit_listing/rules/Allow-Unlimited-Miles.svg"
                        alt=""
                      />
                    )}
                  >
                    <span className="in-black">150 MILES/DAY FREE</span>
                  </Tag>
                </div>
                <div className="d-flex align-items-center">
                  <div className="profile-user-card__photo-rating-icon">
                    <img src="/images/Like - White.svg" alt="" />
                  </div>
                  <p className="mr-16 in-green-300 text-title">95%</p>
                  <p className="text-subheader mr-8">Recommend</p>
                  {/* TODO: FRONT-END PART if count of avatar less than 5,
                 remove class - ant-avatar-group--max
                  */}
                  <Avatar.Group
                    maxCount={2}
                    maxStyle={{ color: '#13284C', backgroundColor: 'white' }}
                    className="ant-avatar-group--max"
                  >
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <Tooltip title="Ant User" placement="top">
                      <Avatar style={{ backgroundColor: '#87d068' }}>A</Avatar>
                    </Tooltip>
                    <Tooltip title="Ant User" placement="top">
                      <Avatar
                        style={{ backgroundColor: '#87d068' }}
                        icon={<i className="icon icon-delivery-f in-black" />}
                      />
                    </Tooltip>
                    <Avatar
                      style={{ backgroundColor: '#1890ff' }}
                      icon={<i className="icon icon-delivery-f in-black" />}
                    />
                  </Avatar.Group>
                </div>
              </div>
              <div id="details-overview" className="van-details__info">
                <div className="text-headline mr-16">Camper info</div>
                <div className="van-details__info-tag-wrap">
                  <Tag className="mr-8" color="default">
                    <span className="font-14">
                      <span className="in-black">Built by:</span>
                      &nbsp;
                      <span className="in-blue-1000 font-600">
                        Van Builders Inc.
                      </span>
                    </span>
                  </Tag>
                </div>
                <p className="van-details__info-numb">Rental #2047639</p>
              </div>
              <div className="mb-24">
                <p className="text-subheader font-400 text-color-gray">
                  Big Buck is ready to go with you on your next adventure, all
                  while allowing you to travel with ease and style. Our brand
                  new, Pebble Gray 2020 Winnebago Revel built on a Mercedes Benz
                  4x4 Sprinter chassis can take you on the ultimate journey! A
                  true performance all year round, our Revel is equipped with
                  230…
                </p>
                <Button
                  size="small"
                  className="mt-4 text-subheader font-400 text-color-gray h-auto p-0"
                  type="simple-text"
                >
                  Read more
                </Button>
              </div>
              <div className="mb-24 mb-md-40">
                <p className="text-subheader mb-16 font-700">Details</p>
                <Row gutter={24}>
                  {detailsArr.map((item) => (
                    <Col md={8} xl={6}>
                      <div className="van-details__details-card">
                        <div className="van-details__details-card-img">
                          <img src={`/images/${item.icon}.svg`} alt="" />
                        </div>
                        <div className="mr-auto">
                          <p>{item.title}</p>
                          <p className="text-subheader font-700">{item.txt}</p>
                        </div>
                        {item.withTooltip && <TooltipIcon phrase="some text" />}
                      </div>
                    </Col>
                  ))}
                </Row>
                <button
                  type="button"
                  className="in-blue-1000 main-link font-600"
                >
                  Hide all
                </button>
              </div>
              <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
              <div className="d-flex align-items-center justify-content-space-between mb-24">
                <p className="text-headline">Amenities</p>
                <Button type="secondary" size="small">
                  Hide all
                </Button>
              </div>
              <AmenitiesBlock />
              <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
              <Row gutter={24}>
                <Col md={12} className="mb-24 mb-md-0">
                  <p className="text-headline mb-24">Rules</p>
                  <div className="d-flex align-items-center mb-16">
                    <img
                      className="mr-12"
                      src="/images/edit_listing/rules/Pets-Allowed.svg"
                      alt=""
                    />
                    <p className="in-black">Pets Allowed</p>
                  </div>
                  <div className="d-flex align-items-center mb-16">
                    <img
                      className="mr-12"
                      src="/images/edit_listing/rules/Smoking-Allowed.svg"
                      alt=""
                    />
                    <p className="in-black">Smoking Allowed</p>
                  </div>
                  <div className="d-flex align-items-center mb-16">
                    <img
                      className="mr-12"
                      src="/images/edit_listing/rules/Festival-Approved.svg"
                      alt=""
                    />
                    <p className="in-black">Festival Approved</p>
                  </div>
                  <div className="d-flex align-items-center mb-16">
                    <img
                      className="mr-12"
                      src="/images/edit_listing/rules/Allow-Unlimited-Miles.svg"
                      alt=""
                    />
                    <p className="in-black">Allow Unlimited Miles</p>
                  </div>
                  <a href="" className="main-link in-blue-1000 font-600">
                    Show all (6)
                  </a>
                </Col>
                <Col md={12}>
                  <p className="text-headline mb-24">Travel Restrictions</p>
                  <Row gutter={24}>
                    <Col span={12}>
                      <p className="mb-16">Location</p>
                      <div className="d-flex align-items-center mb-16 van-details__unavailable-item">
                        <img
                          className="mr-12"
                          src="/images/edit_listing/rules/Mexico.svg"
                          alt=""
                        />
                        <p className="in-black">Mexico</p>
                      </div>
                      <div className="d-flex align-items-center mb-16">
                        <img
                          className="mr-12"
                          src="/images/edit_listing/rules/Canada.svg"
                          alt=""
                        />
                        <p className="in-black">Canada</p>
                      </div>
                      <div className="d-flex align-items-center mb-16 van-details__unavailable-item">
                        <img
                          className="mr-12"
                          src="/images/edit_listing/rules/Burning-Man.svg"
                          alt=""
                        />
                        <p className="in-black">Burning Man</p>
                      </div>
                      <a href="" className="main-link in-blue-1000 font-600">
                        Show all (6)
                      </a>
                    </Col>
                    <Col span={12}>
                      <p className="mb-16">Roads</p>
                      <div className="d-flex align-items-center mb-16 van-details__unavailable-item">
                        <img
                          className="mr-12"
                          src="/images/edit_listing/rules/4x4-Only-Roads.svg"
                          alt=""
                        />
                        <p className="in-black">4x4 Only Roads</p>
                      </div>
                      <div className="d-flex align-items-center mb-16">
                        <img
                          className="mr-12"
                          src="/images/edit_listing/rules/Off-Road.svg"
                          alt=""
                        />
                        <p className="in-black">Off Road</p>
                      </div>
                      <div className="d-flex align-items-center mb-16 van-details__unavailable-item">
                        <img
                          className="mr-12"
                          src="/images/edit_listing/rules/Snow-Icy-Road-Conditions.svg"
                          alt=""
                        />
                        <p className="in-black">Snow / Icy Road Conditions</p>
                      </div>
                      <a href="" className="main-link in-blue-1000 font-600">
                        Show all (6)
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
              <Row gutter={24}>
                <Col md={12} className="mb-24 mb-md-0">
                  <p className="text-headline mb-24">Policies</p>
                  <p className="mb-8">Cancellation policy</p>
                  <p className="text-subheader mb-8 in-blue-1000 font-400">
                    Easy Going
                  </p>
                  <p className="mb-24">
                    Travelers who cancel at least 14 days before check-in will
                    get back 100% of the amount paid. If you cancel between 7
                    and 14 days before check-in, you&apos;ll get back 50%.
                    Otherwise, you won&apos;t get a refund.
                  </p>
                  <Row gutter={24}>
                    <Col span={12}>
                      <p className="mb-8">Minimum stay</p>
                      <p className="text-subheader font-700">2 nights</p>
                    </Col>
                    <Col span={12}>
                      <div className="d-flex mb-8">
                        <p>Refundable security deposit</p>
                        <TooltipIcon
                          phrase="some som"
                          iconClass="icon-info-f"
                        />
                      </div>
                      <p className="text-subheader font-700">$2,000.00</p>
                    </Col>
                  </Row>
                </Col>
                <Col md={12}>
                  <p className="text-headline mb-24">Health & Safety</p>
                  <div className="d-flex align-items-center mb-16">
                    <img
                      className="mr-12"
                      src="/images/edit_listing/health_safety/Social-Distancing.svg"
                      alt=""
                    />
                    <p className="in-black">
                      Social-distancing and other COVID-19-related guidelines
                      apply
                    </p>
                  </div>
                  <div className="d-flex align-items-center mb-16">
                    <img
                      className="mr-12"
                      src="/images/edit_listing/health_safety/Camera.svg"
                      alt=""
                    />
                    <p className="in-black">
                      Security Camera / Recording Device
                    </p>
                  </div>
                  <div className="d-flex align-items-center mb-16">
                    <img
                      className="mr-12"
                      src="/images/edit_listing/health_safety/Alarm.svg"
                      alt=""
                    />
                    <p className="in-black">Carbon Monoxide Alarm</p>
                  </div>
                  <div className="d-flex align-items-center mb-16">
                    <img
                      className="mr-12"
                      src="/images/edit_listing/health_safety/Smoke-Alarm.svg"
                      alt=""
                    />
                    <p className="in-black">Smoke Alarm</p>
                  </div>
                  <a href="" className="main-link in-blue-1000 font-600">
                    Show all (6)
                  </a>
                </Col>
              </Row>
              <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
              <p className="text-headline mb-24">Add-ons</p>
              <Row gutter={24}>
                <Col md={8} xl={6}>
                  <div className="van-details__adds-card">
                    <div className="d-flex align-items-center justify-content-between mb-20">
                      <img
                        src="/images/listing/amenities-svg/bathroom/toilet_full_use.svg"
                        alt=""
                      />
                      <Tag color="default">$5.00 per day</Tag>
                    </div>
                    <p className="text-subtitle font-700 mb-8">Toilet</p>
                    <p>
                      A toilet is a piece of sanitary hardware used for the
                      collection or…
                    </p>
                    <Button type="simple-text">Read more</Button>
                  </div>
                </Col>
                <Col md={8} xl={6}>
                  <div className="van-details__adds-card">
                    <div className="d-flex align-items-center justify-content-between mb-20">
                      <img src="" alt="" />
                      <Tag color="default">$5.00 per day</Tag>
                    </div>
                    <p className="text-subtitle font-700 mb-8">Tent</p>
                    <p>
                      A tent is a shelter consisting of sheets of fabric or
                      other material...
                    </p>
                    <Button type="simple-text">Read more</Button>
                  </div>
                </Col>
                <Col md={8} xl={6}>
                  <div className="van-details__adds-card">
                    <div className="d-flex align-items-center justify-content-space-between mb-20 w-100">
                      <img
                        src="/images/listing/amenities-svg/edit_listing/essentials/Camping-Chairs.svg"
                        alt=""
                      />
                      <Tag color="default">$25.00 each</Tag>
                    </div>
                    <p className="text-subtitle font-700 mb-8">Camping Chair</p>
                    <p>Open size: 60x85x46/108(H)cm.</p>
                  </div>
                </Col>
              </Row>
              <a href="" className="main-link in-blue-1000 font-600">
                Show all (6)
              </a>
              <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
              <div id="details-availability">
                <p className="text-headline mb-24">Availability</p>
                <div id="static-rangepicker" className="static-rangepicker" />

                <RangePicker
                  open
                  format="MMM D, YYYY"
                  getPopupContainer={() => document.getElementById('static-rangepicker')
                  }
                />
              </div>
            </Col>
            <Col xl={8}>
              <StickyInfoCard cardHidden={cardHidden} />
            </Col>
            <Col span={24}>
              <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
              <div id="details-reviews" className="van-details__reviews">
                <p className="text-headline mb-24 mb-md-40">26 Reviews</p>
                <Row gutter={24}>
                  <Col xl={12}>
                    <ReviewItem />
                  </Col>
                  <Col xl={12}>
                    <ReviewItem />
                  </Col>
                  <Col xl={12}>
                    <ReviewItem />
                  </Col>
                  <Col xl={12}>
                    <ReviewItem />
                  </Col>
                </Row>
              </div>
              <Button type="secondary" size="small">
                Show all 26 reviews
              </Button>
              <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
              <div
                id="details-location"
                className="d-md-flex justify-content-space-between mb-24"
              >
                <p className="text-headline mb-16 mb-md-0 font-700">Location</p>
                <div className="d-flex align-items-center">
                  <img
                    className="mr-12"
                    src="/images/listing/Modern-Van.svg"
                    alt=""
                  />
                  <p className="font-600">
                    Modern van in
                    {' '}
                    <a href="" className="in-blue-1000">
                      Los Angeles
                    </a>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
          <div className="van-details__location">{/* Iframe here */}</div>
          <div className="mb-40 mb-md-60">
            <Row gutter={24} align="bottom">
              <Col md={16} xl={10} className="mb-24 mb-md-0">
                <div className="d-flex mb-16">
                  <Avatar
                    className="mr-16 flex-shrink-0"
                    src="https://randomuser.me/api/portraits/women/87.jpg"
                    alt="Han Solo"
                    size={64}
                  />
                  <div>
                    <div className="d-flex flex-wrap mb-8">
                      <p className="mr-4 text-headline font-700">Owned by</p>
                      <p className="text-headline in-blue-1000 font-700">
                        Stephen Buchanan
                      </p>
                    </div>
                    <p className="">Member since August 2016</p>
                  </div>
                </div>
                <div className="d-flex align-items-center flex-wrap mb-16">
                  <div className="profile-user-card__photo-rating-icon">
                    <img src="/images/Like - White.svg" alt="" />
                  </div>
                  <p className="mr-4 in-green-300 text-subheader font-700">
                    95%
                  </p>
                  <p className="mr-16 text-color-gray text-subheader font-400">
                    (120)
                  </p>
                  <p className="mr-16 text-subheader font-400">
                    <i className="icon icon-camper-f mr-8" />
                    2 campers
                  </p>
                  <p className="mt-16 mt-md-0 text-subheader font-400">
                    <i className="icon icon-activate-f mr-8 in-azure-1000" />
                    Identity verified
                  </p>
                </div>
                <p className="text-color-gray text-subheader font-400">
                  Hi there, My name is Stephen Buchanan, and I work in the film
                  industry. I love the outdoors, spending time with my family,
                  and taking them on new adventures throughout our beautiful…
                </p>
                <Button
                  className="mt-4 p-0 text-subheader font-400 h-auto"
                  type="simple-text"
                >
                  Read more
                </Button>
              </Col>
              <Col md={8} xl={{ span: 6, offset: 4 }}>
                <p className="mb-16 text-subheader font-400">
                  Response rate: 90%
                </p>
                <p className="mb-24 text-subheader font-400">
                  Response time: within a few hours
                </p>
                <MainBtnGradient
                  size="large"
                  className="min-w-180 main-btn--sm-100"
                  text="Ask a question"
                />
              </Col>
            </Row>
          </div>
          <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
          <div className="main-slider-container">
            <h2 className="text-headline mr-32 mr-lg-148 mb-24">Similar rentals</h2>
            <SliderFavorite />
          </div>
          <Divider className="mt-24 mt-md-40 mb-24 mb-md-40" />
          <div className="mb-24 mb-md-36 ">
            <p className="text-headline mb-24 mb-md-40">
              Explore camper rentals nearby
            </p>
            <Row gutter={24}>
              {rentalsNearby.map((item) => (
                <Col span={12} md={8} xl={4}>
                  <a
                    href=""
                    className="main-link d-inline-block mb-16 mb-md-24 text-subheader font-400"
                  >
                    {item}
                  </a>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
      <Footer />
      <StickyCardBottom />
    </div>
  );
};

export default CampervanDetails;
