import React from 'react';
import {
  Row, Col, Select, Form, Collapse,
} from 'antd';
import Header from '../layout/headers/mainHeader/Header';
import Footer from '../../shared/UserFooter';
import MainBtnGradient from '../shared/buttons/MainBtnGradient';
import CarCard from '../listing/components/CarCard';

const { Option } = Select;
const { Panel } = Collapse;

const rvProtected = [{
  img: '/images/booking/booking_details/Insurance_Coverage.svg',
  title: '$1 Million Liability Insurance',
  text: 'Well above state minimum. You’re protected if a rare incident occurs, including damage to vehicles, property or injuries suffered.',
},
  {
    img: '/images/listing/insurance/Damage_Protection.svg',
    title: '$200,000 Damage Protection',
    text: 'Includes interior damage, RV and campervan conversion work, as well as exterior damage.',
  },
  {
    img: '/images/booking/booking_details/Roadside_Assistance.svg',
    title: '24/7 Roadside Assistance',
    text: 'Help is a call away. We’ll dispatch help if there are any issues, such as a dead battery or flat tire.',
  },
  {
    img: '/images/listYourcampervan/blue_icons/person_check.svg',
    title: 'Verified Renters',
    text: 'Every booking you’ll receive on Vancation comes from a vetted renter. We require live ID verification and a motor vehicle record check.',
  },
];

const whyList = [{
  img: 'better_price',
  title: 'Better Pricing',
  text: 'We’re rewarding RV owners who sign-up early with the lowest service fees forever. Join for free and keep over 88% of all booking revenue!',
  color: 'green',
},
  {
    img: 'competition',
    title: 'Less ExternalCalendarsFooter Competition',
    text: 'We are a new marketplace with solid renter traffic. You’ll enjoy less listings to compete with for bookings.',
    color: 'yellow',
  },
  {
    img: 'key_red',
    title: '100% Electronic Key Exchange',
    text: 'Still printing out rental agreements or manually uploading return agreements and photos? Vancation can handle it all in a few easy clicks.',
    color: 'red',
  },
];

const rvFleet = [{
  img: '/images/listYourcampervan/blue_icons/people.svg',
  text: 'We’re looking to partner with your company. We can work out early adopter deals with you such as custom fleet pricing, exclusive rights to listing locations or anything you can dream up.',
},
  {
    img: '/images/listYourcampervan/blue_icons/tablet_check.svg',
    text: 'Partners will receive lead referrals from RV owners via Vancation if you’re interested in growing your fleet.',
  },
  {
    img: '/images/listYourcampervan/blue_icons/box.svg',
    text: 'We are also building a campervan builder database & review system. We will refer leads over to our partner van builder network.',
  },
  {
    img: '/images/listYourcampervan/blue_icons/chart.svg',
    text: 'Free marketing exposure for your fleet through our business profiles and search results. We also promote fleet partners with ~20% of the marketing and ad budget.',
  },
];

const faq = [{
  title: 'Can I still use my camper while it is listed on Vancation?',
  text: 'Of course! You can update your calendar availability with the click of a button.',
},
  {
    title: 'Is my camper really insured and protected?',
    text: 'Of course! You can update your calendar availability with the click of a button.',
  },
  {
    title: 'Is my RV a fit for Vancation?',
    text: 'Of course! You can update your calendar availability with the click of a button.',
  },
  {
    title: 'How does Vancation verify renters?',
    text: 'Of course! You can update your calendar availability with the click of a button.',
  },
  {
    title: 'Can I decide who rents my RV?',
    text: 'Of course! You can update your calendar availability with the click of a button.',
  },
  {
    title: 'How do I get paid?',
    text: 'Of course! You can update your calendar availability with the click of a button.',
  },
  {
    title: 'How does the pick-up process work?',
    text: 'Of course! You can update your calendar availability with the click of a button.',
  },
];

const ListYourCamper = () => (
  <>
    <Header unlogged />
    <div className="container">
      <div className="your-van-main">
        <Row gutter={24}>
          <Col order={2} xl={{ span: 12, order: 1 }}>
            <div className="your-van-main__img">
              <img src="/images/listYourcampervan/main.png" alt="" />
            </div>
          </Col>
          <Col order={1} xl={{ span: 12, order: 2 }}>
            <h1 className="your-van-main__title">
              Ready to Earn Over
              {' '}
              <span className="in-blue-1000">$50,000/year</span>
              {' '}
              Renting out your
              {' '}
              <span className="in-blue-1000">Campervan</span>
              {' '}
              or
              {' '}
              <span className="in-blue-1000">RV?</span>
            </h1>
            <Form layout="vertical">
              <div className="main-input">
                <Form.Item label={<span className="main-input__label">Vehicle type</span>}>
                  <Select
                    id="fieldID"
                    name="fieldName"
                    className="main-input__field"
                    optionLabelProp="label"
                    placeholder="Select vehicle type"
                  >
                    <Option value="select1" label="+1">
                      <li className="main-dropdown__item">
                        <div className="min-w-60 mr-12">
                          <img src="/images/listing/Modern-Van.svg" alt="" />
                        </div>
                        <div>
                          <div className="mb-4 in-black">
                            Modern Van
                          </div>
                          <p className="text-caption pre-wrap">
                            Sprinters, Transits, Promasters & More Fully Built Out Camper Vans.
                          </p>
                        </div>
                      </li>
                    </Option>
                    <Option value="select2" label="+2">
                      <li className="main-dropdown__item">
                        <div className="min-w-60 mr-12">
                          <img src="/images/listing/VW-Bus.svg" alt="" />
                        </div>
                        <div>
                          <div className="mb-4 in-black">
                            VW Bus
                          </div>
                          <p className="text-caption pre-wrap">
                            Iconic and Classic. Westfalias,
                            Vanagons, Eurovans & More Volkswagen Vans.
                          </p>
                        </div>
                      </li>
                    </Option>
                    <Option value="select2" label="+2">
                      <li className="main-dropdown__item">
                        <div className="min-w-60 mr-12">
                          <img src="/images/listing/Unique-Camper.svg" alt="" />
                        </div>
                        <div>
                          <div className="mb-4 in-black">
                            Unique Camper
                          </div>
                          <p className="text-caption pre-wrap">
                            Skoolies, Ambulances and Other Unique Camper Conversions.
                          </p>
                        </div>
                      </li>
                    </Option>
                    <Option value="select2" label="+2">
                      <li className="main-dropdown__item">
                        <div className="min-w-60 mr-12">
                          <img src="/images/listing/Vehicle-Camper.svg" alt="" />
                        </div>
                        <div>
                          <div className="mb-4 in-black">
                            Vehicle Camper
                          </div>
                          <p className="text-caption pre-wrap">
                            Truck Camper Rigs. Car, Minivan, Jeep and SUV
                            conversions, typically with roof top tents.
                          </p>
                        </div>
                      </li>
                    </Option>
                  </Select>
                </Form.Item>
              </div>
              <CarCard isFloat />
              <MainBtnGradient
                size="large"
                className="w-100"
                text="Get Started"
              />
            </Form>
          </Col>
        </Row>
      </div>
    </div>
    <div className="your-van-protected">
      <div className="d-flex justify-content-center">
        <div className="van-rentals__insur-provider">
          <p className="text-caption mb-8 text-uppercase">
            Insurance Provider
          </p>
          <img src="/images/vanRentals/C&FLogo.png" alt="" />
        </div>
      </div>
      <div className="container">
        <p className="main-title mb-40 mb-md-60">
          Your RV is Protected
        </p>
        <Row gutter={24}>
          {rvProtected.map(item => (
            <Col md={12} xl={6} className="your-van-protected__item-wrap">
              <div className="your-van-protected__item">
                <img className="your-van-protected__item-img" src={item.img} alt="" />
                <p className="text-title mb-16">{item.title}</p>
                <p>{item.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
    <div className="container overflow-x-hidden">
      <div className="home-inner-wrap">
        <p className="main-title mb-40 mb-md-60">
          Why List with Vancation?
        </p>
        <Row gutter={24}>
          {whyList.map(item => (
            <Col xl={8} className="your-van-list__item-wrap">
              <div className="your-van-list__item">
                <div className={`your-van-list__item-img light-background--${item.color}`}>
                  <img src={`/images/listYourcampervan/colored_icons/${item.img}.svg`} alt="" />
                </div>
                <div>
                  <p className="text-title mb-8 mb-md-16">
                    {item.title}
                  </p>
                  <p>
                    {item.text}
                  </p>
                </div>
              </div>
            </Col>
          ))
          }
        </Row>
      </div>
    </div>
    <div className="your-van-fleet home-inner-wrap">
      <div className="container">
        <p className="main-title mb-40 mb-md-60">
          Own an RV Fleet?
        </p>
        <Row gutter={24}>
          {rvFleet.map(item => (
            <Col xl={6} className="mb-40">
              <div className="your-van-fleet__img">
                <img src={item.img} alt="" />
              </div>
              <p className="text-subheader font-400 text-align-center">
                {item.text}
              </p>
            </Col>
          ))
          }
        </Row>
        <Row justify="center">
          <Col md={8} xl={4}>
            <MainBtnGradient
              className="w-100 mt-60"
              text="Become a Partner"
              size="large"
            />
          </Col>
        </Row>
      </div>
    </div>
    <div className="container">
      <div className="home-inner-wrap">
        <div className="your-van-profit-banner container">
          <Row justify="center">
            <Col xl={16}>
              <p className="text-display-jumbo in-white mb-16 text-align-center">
                Rent your Camper and Earn Over
                $50,000/year with
                {' '}
                <span className="in-blue-1000">Vancation</span>
              </p>
              <p className="home-profit__txt mb-16">
                Join the safest campervan & unique RV marketplace in existence. Industry leading
                insurance, full MVR renter screening and the lowest booking fees around.
              </p>
              <ul className="your-van-profit-banner__list">
                <li className="your-van-profit-banner__list-item">
                  <img className="mr-12" src="/images/listYourcampervan/colored_icons/green_checked.svg" alt="" />
                  <p className="text-subheader in-white font-400">
                    Free to Join
                  </p>
                </li>
                <li className="your-van-profit-banner__list-item">
                  <img className="mr-12" src="/images/listYourcampervan/colored_icons/green_checked.svg" alt="" />
                  <p className="text-subheader in-white font-400">
                    $1 Million Insurance Protection
                  </p>
                </li>
                <li className="your-van-profit-banner__list-item">
                  <img className="mr-12" src="/images/listYourcampervan/colored_icons/green_checked.svg" alt="" />
                  <p className="text-subheader in-white font-400">
                    Less Listing Competition
                  </p>
                </li>
              </ul>
            </Col>
          </Row>
          <Row justify="center">
            <Col md={8} xl={4}>
              <MainBtnGradient
                className="w-100"
                text="List Your Camper"
                size="large"
              />
            </Col>
          </Row>
        </div>
      </div>
      <div className="home-inner-wrap">
        <p className="main-title mb-16 text-align-center">
          Still have questions?
        </p>
        <p className="mb-40 mb-md-60 text-subheader text-color-gray font-400 text-align-center">
          Here’s what we get asked the most.
        </p>
        <Row justify="center">
          {faq.map(item => (
            <Col xl={16}>
              <Collapse
                className="faq-collapse"
                expandIcon={() => (
                  <i className="icon icon-down" />
                )}
                expandIconPosition="right"
              >
                <Panel
                  header={(
                    <>
                      <p className="faq-collapse-title">{item.title}</p>
                    </>
                  )}
                  key={item.type}
                >
                  {item.text}
                </Panel>
              </Collapse>
            </Col>
          ))}
        </Row>
      </div>
    </div>
    <Footer />
  </>
);

export default ListYourCamper;
