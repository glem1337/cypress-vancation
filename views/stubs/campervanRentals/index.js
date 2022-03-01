import {
 Row, Col, Divider, Input, Tabs, Button,
} from 'antd';
import StickyHelpButton from 'views/stubs/shared/buttons/StickyHelpButton';
import HeaderHomeSearch from 'views/stubs/layout/headers/headerHome/HeaderHomeSearch';
import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import Slider from 'views/stubs/search/components/Slider';
import HomeSearchGoing from 'views/stubs/home/components/HomeSearchGoing';
import { Footer } from 'views/stubs/layout/Footer';
import SliderFavorite from 'views/stubs/home/components/SliderFavorite';
import SliderInsta from 'views/stubs/home/components/SliderInsta';
import SliderFavoriteDestination from 'views/stubs/home/components/SliderFavoriteDestination';
import Header from '../layout/headers/mainHeader/Header';

const howVancationWork = [
  {
    icon: 'Search',
    title: 'Find the perfect campervan',
    text: 'Enter a location and date, choose from 100s of campervan and RV listings by trusted hosts.',
  },
  {
    icon: 'Calendar',
    title: 'Book your trip',
    text: 'Book online securely and travel safely with $1 million in liability insurance protection and roadside assistance.',
  },
  {
    icon: 'Road',
    title: 'Hit the road',
    text: 'Have your dream campervan or RV delivered, or pick it up from the host. Handle everything online, grab the keys and hit the road in style!',
  },
];

const VanRentals = () => (
  <div className="van-rentals">
    <Header unlogged />
    <div className="home-wrap">
      <div className="home__first-block-wrap">
        <div className="container">
          <Row justify="center">
            <Col xl={18}>
              <h1 className="home-title">
                <span className="in-blue-1000">Campervan</span>
                {' '}
                Rentals You’ll
                Love
              </h1>
            </Col>
            <Col xl={16}>
              <p className="home-txt">
                Hit the road in style with a dream glamper or campervan rental.
              </p>
            </Col>
          </Row>
        </div>
        <div className="home-banner__wrap">
          <div className="container d-flex">
            <HeaderHomeSearch />
            <div className="home-banner">
              <img
                src="/images/vanRentals/Vancation banner_1160x360.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="home-inner-wrap d-flex justify-content-center">
        <div className="van-rentals__insur-provider">
          <p className="text-caption mb-8 text-uppercase">Insurance Provider</p>
          <img src="/images/vanRentals/C&#38;FLogo.png" alt="" />
        </div>
      </div>
      <div className="container home-inner-wrap">
        <div className="mb-40 mb-md-60">
          <h2 className="home__how-works-title">
            How
            {' '}
            <span className="in-blue-1000">Vancation</span>
            {' '}
            Works
          </h2>
        </div>
        <Row justify="center">
          {howVancationWork.map((item) => (
            <Col xl={6} className="home__how-works-card">
              <div className="home__how-works-card-inner">
                <div className="home__how-works-card-icon">
                  <img src={`/images/home/${item.icon}.svg`} alt="" />
                </div>
                <div className="home__how-works-card-desc">
                  <p className="mb-16 text-title">{item.title}</p>
                  <p>{item.text}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div className="home__favorite">
        <div className="container">
          <div className="home__favorite-inner">
            <Row>
              <Col md={20}>
                <h2 className="home-title-sec mb-16">
                  Some of our favorite campervan roadtrip destinations
                </h2>
              </Col>
              <Col span={22} md={20} xl={14}>
                <p className="text-subheader text-color-gray font-400">
                  The world is your playground when you&rsquo;re traveling in a
                  campervan or unique RV. Checkout a few of our favorite places
                  that your home on wheels can take you.
                </p>
              </Col>
            </Row>
            <SliderFavoriteDestination />
          </div>
          <Divider className="mt-50 mt-md-70 mb-0" />
        </div>
      </div>
      <div>
        <div className="container">
          <h2 className="home-title-sec mb-16">
            Here’s a few of our favorite campervan rentals
          </h2>
          <div>
            <Row>
              <Col span={22} md={20} xl={14}>
                <p className="mb-40 mb-md-60 font-16">
                  Here are some of our favorite glampers in the USA. Browse
                  Vancation to rent your dream Sprinter, vintage Westies and
                  more!
                </p>
              </Col>
            </Row>
            <SliderFavorite className="home-slider-pos" />
          </div>
        </div>
      </div>
      <div className="home-discover-wrap">
        <div className="container">
          <h2 className="home-title-sec mb-16">
            Discover top campervan destinations near you
          </h2>
          <div className="mb-md-20">
            <Row>
              <Col span={22} md={20} xl={14}>
                <p className="mb-40 mb-md-60 font-16">
                  Leave home behind and hit the road for a short (or long) trip.
                  We have some cool campervans that you&lsquo;re going to love.
                  Check out some popular destinations near you.
                </p>
              </Col>
            </Row>
            <Slider className="home-slider-pos" slidesCount={12} />
          </div>
          <Divider className="mt-50 mt-md-70 mb-0" />
        </div>
      </div>
      <div className="home-inner-wrap">
        <div className="container">
          <h2 className="home-title-sec mb-16 mb-md-8">
            Need some inspiration for your next trip?
          </h2>
          <p className="mb-32 mb-md-48 text-title font-400">
            Here&lsquo;s some ideas for your next getaway👇
          </p>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Campervan epicenters" key="1">
              <Row>
                {new Array(24).fill('').map(() => (
                  <Col span={12} md={8} xl={4}>
                    <a href="" className="d-inline-block mb-24">
                      <p className="mb-4 text-subheader font-400">Sikulbe</p>
                      <p className="text-color-gray">Tuvnelnu</p>
                    </a>
                  </Col>
                ))}
              </Row>
              <Button size="small" type="secondary">
                Show all 68 cities
              </Button>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Roadtrip destinations near you" key="2">
              Content of Tab Pane 2
            </Tabs.TabPane>
            <Tabs.TabPane tab="Campervan rentals by state" key="3" disabled>
              Content of Tab Pane 3
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
      <div className="home-vanlife-wrap">
        <div className="container">
          <Row gutter={24}>
            <Col span={24}>
              <h2 className="home-title-sec mb-24 mb-md-40">
                What is van life anyways?
              </h2>
            </Col>
            <Col xl={10}>
              <p className="text-subheader font-400">
                Van life really isn’t about the van at all (although we think
                campervans are pretty cool). It’s about where the van takes you,
                a tool to get you from point A to wherever your point B dream
                is. It’s about the long drives on those nameless roads. Waking
                up to that perfect mountain view. Falling asleep in the middle
                of who knows where to the sound of, well, nothing. That’s van
                life. Rent your dream camper today and begin your journey. The
                road is calling.
              </p>
            </Col>
            <Col xl={{ span: 10, offset: 2 }}>
              <p className="text-subheader font-400">
                Vancation was built by van lifers, for van lifers, in beautiful
                Lake Tahoe. We believe campervans and unique RVs should have a
                platform of their own, they shouldn’t be lost in a sea of RVs.
                Our goal is to create the safest and largest campervan rental
                marketplace around. We’re a small startup with big dreams. We
                hope to connect van lifers around the world. Whether you want to
                rent, build or buy your own campervan someday, Vancation will be
                your destination.
              </p>
            </Col>
          </Row>
        </div>
      </div>
      <div className="home-inner-wrap scroll-hidden" />
      <div className="home-inner-wrap">
        <div className="container">
          <h2 className="home-title-sec mb-8">
            Interested in campervans and the van life movement?
          </h2>
          <p className="text-title mb-16 font-400">Check this out👇</p>
          <div className="mb-40 mb-md-60">
            <Row>
              <Col span={16}>
                <a
                  rel="noreferrer"
                  className="d-inline-flex align-items-center"
                  href="https://www.instagram.com/govancation/"
                  target="_blank"
                >
                  <div className="home-insta-link">
                    <i className="icon icon-instagram in-white font-20" />
                  </div>
                  <p className="text-title font-400">@GoVancation</p>
                </a>
              </Col>
            </Row>
          </div>
          <SliderInsta />
        </div>
      </div>
      <div className="home-discount-code-wrap">
        <div className="container">
          <h2 className="home-title-sec">
            Get discount codes, campervan inspiration and stay in the know on
            everything van life
          </h2>
          <div className="mb-20">
            <Row justify="center">
              <Col xl={12}>
                <Input.Group>
                  <Row>
                    <Col span={17} md={19} xl={17}>
                      <Input
                        className="main-input-group--left"
                        placeholder="Enter email"
                      />
                    </Col>
                    <Col span={7} md={5} xl={7}>
                      <MainBtnGradient
                        className="w-100 main-input-group--right pl-0 pr-0"
                        size="large"
                        text="Get Started"
                      />
                    </Col>
                  </Row>
                </Input.Group>
              </Col>
            </Row>
          </div>
          <Row justify="center">
            <Col xl={14}>
              <p className="home-discount-code__txt">
                We care about your privacy and won’t spam you or sell your info
                to anyone. Read our
                {' '}
                <a href="">Privacy Policy.</a>
              </p>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div className="home-inner-wrap">
      <div className="container">
        <div className="home-ready-wrap">
          <h2 className="home-title">Ready to hit the road?</h2>
          <Row justify="center">
            <Col span={22} md={16} xl={8}>
              <div className="home-ready__search-wrap">
                <HomeSearchGoing />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <StickyHelpButton />
    <Footer />
  </div>
);

export default VanRentals;
