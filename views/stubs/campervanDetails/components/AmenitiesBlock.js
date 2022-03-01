import React from 'react';
import {
  Collapse, Button, Space, Row, Col,
} from 'antd';
import TooltipIcon from '../../shared/TooltipIcon';

const { Panel } = Collapse;

const amenitiesArr = [
  {
    icon: '/images/profile/Diamond.svg',
    title: 'Glamper amenities',
    type: 'Glamperamenities',
  },
  {
    icon: '/images/listing/amenities-svg/accommodation/couch.svg',
    title: 'Accommodation',
    type: 'Accommodation',
  },
  {
    icon: '/images/listing/amenities-svg/kitchen/cooking_pot.svg',
    title: 'Kitchen',
    type: 'Kitchen',
  },
  {
    icon: '/images/listing/amenities-svg/bathroom/bath.svg',
    title: 'Bathroom',
    type: 'Bathroom',
  },
  {
    icon: '/images/listing/amenities-svg/climate_control/air_conditioning.svg',
    title: 'Climate control',
    type: 'Climatecontrol',
  },
  {
    icon: '/images/listing/amenities-svg/power_system/power_system.svg',
    title: 'Power system',
    type: 'Powersystem',
  },
  {
    icon: '/images/listing/amenities-svg/edit_listing/bonus/Star.svg',
    title: 'Bonus features',
    type: 'Bonusfeatures',
  },
  {
    icon: '/images/listing/amenities-svg/entertainment/gamepad.svg',
    title: 'Entertainment',
    type: 'Entertainment',
  },
  {
    icon: '/images/listing/amenities-svg/edit_listing/essentials/Two-Bottles.svg',
    title: 'Essentials',
    type: 'Essentials',
  },
];

/* TODO: TO FRONT-END  When panel is clicked need to change button to
      <Button
        className="border-none"
        icon={<i className="icon icon-up font-12 in-blue-1000" />}
        size="small"
        shape="circle"
      />
*
*   */

const AmenitiesBlock = () => (
  <Space
    direction="vertical"
    className="w-100"
    size={16}
  >
    {amenitiesArr.map(item => (
      <Collapse
        className="van-details__amenities"
        expandIcon={() => (
          <Button
            type="secondary"
            icon={<i className="icon icon-down font-12 in-blue-1000" />}
            size="small"
            shape="circle"
          />
        )}
        expandIconPosition="right"
        defaultActiveKey={['Glamperamenities']}
      >
        <Panel
          header={(
            <>
              <img src={item.icon} alt="" />
              <p className="text-subtitle font-700">{item.title}</p>
            </>
          )}
          key={item.type}
        >
          {
            {
              Glamperamenities: (
                <Row gutter={24}>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/edit_listing/bonus/Awning.svg" alt="" />
                      <p>
                        Awning
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/edit_listing/bonus/Backup-Camera.svg" alt="" />
                      <p>
                        Backup Camera
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/edit_listing/bonus/Exterior-Bike-Rack.svg" alt="" />
                      <p>
                        Bike Rack
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/bedroom/extra_storage.svg" alt="" />
                      <p>
                        Extra Storage
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/power_system/inverter.svg" alt="" />
                      <p>
                        Inverter
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/edit_listing/bonus/Leveling-Jacks.svg" alt="" />
                      <p>
                        Leveling Jacks
                      </p>
                    </div>
                  </Col>
                </Row>
              ),
              Accommodation: (
                <Row gutter={24}>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/accommodation/queen_bed.svg" alt="" />
                      <p>
                        1x Queen Bed
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/accommodation/single_bed.svg" alt="" />
                      <p>
                        2x Single Bed
                      </p>
                    </div>
                  </Col>
                </Row>
              ),
              Kitchen: (
                <Row gutter={24}>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/kitchen/stovetop.svg" alt="" />
                      <p>
                        Stovetop
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/kitchen/oven.svg" alt="" />
                      <p>
                        Oven
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/kitchen/sink.svg" alt="" />
                      <p>
                        Sink
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/kitchen/hot-water.svg" alt="" />
                      <p>
                        Hot Water
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/kitchen/microwave.svg" alt="" />
                      <p>
                        Microwave
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/kitchen/fridge.svg" alt="" />
                      <p>
                        Fridge
                      </p>
                    </div>
                  </Col>
                </Row>
              ),
              Bathroom: (
                <Row gutter={24}>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/bathroom/outdoor_shower.svg" alt="" />
                      <p>
                        Outdoor Shower
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/bathroom/indoor_shower.svg" alt="" />
                      <p>
                        Indoor Shower
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/kitchen/hot-water.svg" alt="" />
                      <p>
                        Hot Water
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/bathroom/toilet_urine_only.svg" alt="" />
                      <p>
                        Toilet (Urine Only)
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/bathroom/toilet_full_use.svg" alt="" />
                      <p>
                        Toilet (Full Use)
                      </p>
                    </div>
                  </Col>
                </Row>
              ),
              Climatecontrol: (
                <Row gutter={24}>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/climate_control/ceiling-fan.svg" alt="" />
                      <p>Ceiling Fan</p>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="d-flex align-items-center mb-20">
                      <img
                        src="/images/listing/amenities-svg/climate_control/air-conditioner.svg"
                        className="mr-12"
                        alt=""
                      />
                      <p className="in-black font-600">Air Conditioner</p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/climate_control/hookups_required_for_a_c.svg" alt="" />
                      <p>
                        Hookups Required for A/C
                      </p>
                      <TooltipIcon phrase="some text" />
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="d-flex align-items-center mb-20">
                      <img
                        src="/images/listing/amenities-svg/climate_control/air-conditioner.svg"
                        className="mr-12"
                        alt=""
                      />
                      <p className="in-black font-600">Heating</p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/climate_control/portable-heater.svg" alt="" />
                      <p>
                        Portable Heater
                      </p>
                    </div>
                  </Col>
                  <Col span={24}>
                    <button type="button" className="main-link mb-24 in-blue-1000 font-600">
                      Show unavailable
                    </button>
                  </Col>
                </Row>
              ),
              Powersystem: (
                <Row gutter={24}>
                  <Col span={24}>
                    <div className="d-flex align-items-center mb-20">
                      <img
                        src="/images/listing/amenities-svg/power_system/solar-panels.svg"
                        className="mr-12"
                        alt=""
                      />
                      <p className="in-black font-600">Off Grid Capable System</p>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="d-flex align-items-center mb-20">
                      <img
                        src="/images/listing/amenities-svg/power_system/electric-power-system.svg"
                        className="mr-12"
                        alt=""
                      />
                      <p className="in-black font-600">Electric Power System</p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/power_system/battery-storage-under.svg" alt="" />
                      <p>Battery Storage (under 300 amp hours)</p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/power_system/inverter.svg" alt="" />
                      <p>
                        Inverter
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/power_system/solar-panels.svg" alt="" />
                      <p>
                        Solar Panels
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card van-details__unavailable-item">
                      <img src="/images/listing/amenities-svg/power_system/battery-storage-plus.svg" alt="" />
                      <p>
                        Battery Storage (300+ amp hours)
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card van-details__unavailable-item">
                      <img src="/images/listing/amenities-svg/power_system/alternator-charger.svg" alt="" />
                      <p>
                        Alternator Charger
                      </p>
                    </div>
                  </Col>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/power_system/electrical-outlets.svg" alt="" />
                      <p>
                        A/C Electrical Outlets
                      </p>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="d-flex align-items-center mb-20">
                      <img
                        src="/images/listing/amenities-svg/power_system/generator.svg"
                        className="mr-12"
                        alt=""
                      />
                      <p className="in-black font-600">Generator</p>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="d-flex align-items-center mb-20 van-details__unavailable-item">
                      <img
                        src="/images/listing/amenities-svg/power_system/propane-fuel-system.svg"
                        className="mr-12"
                        alt=""
                      />
                      <p className="in-black font-600">Propane Fuel System</p>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="d-flex align-items-center mb-20 van-details__unavailable-item">
                      <img
                        src="/images/listing/amenities-svg/power_system/shore-power-hookups.svg"
                        className="mr-12"
                        alt=""
                      />
                      <p className="in-black font-600">Shore Power Hookups</p>
                      <TooltipIcon phrase="some som" iconClass="icon-info-f font-24" />
                    </div>
                  </Col>
                  <Col span={24}>
                    <button type="button" className="main-link mb-24 in-blue-1000 font-600">
                      Show unavailable
                    </button>
                  </Col>
                </Row>
              ),
              Bonusfeatures: (
                <Row gutter={24}>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/edit_listing/bonus/Swivel-Seat(s).svg" alt="" />
                      <p>Swivel Seat(s)</p>
                    </div>
                  </Col>
                </Row>
              ),
              Entertainment: (
                <Row gutter={24}>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/entertainment/upgraded-speaker-system.svg" alt="" />
                      <p>Upgraded Speaker System</p>
                    </div>
                  </Col>
                </Row>
              ),
              Essentials: (
                <Row gutter={24}>
                  <Col md={12} lg={8}>
                    <div className="van-details__details-card">
                      <img src="/images/listing/amenities-svg/edit_listing/essentials/Paper.svg" alt="" />
                      <p>Toilet Paper / Paper Towels</p>
                    </div>
                  </Col>
                </Row>
              ),
            }[item.type]
          }
        </Panel>
      </Collapse>
    ))}
  </Space>
);

export default AmenitiesBlock;
