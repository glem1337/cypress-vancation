import {
  Row,
  Col,
  Switch,
  Checkbox,
  Divider,
  Button,
  Form,
} from 'antd';
import CarCard from './components/CarCard';
import BigCheckbox from './components/BigCheckbox';
import BigCheckboxCounter from './components/BigCheckboxCounter';
import TooltipIcon from '../shared/TooltipIcon';
import CustomAccBlock from './components/CustomAccBlock';
import LayoutListing from './LayoutListing';

const Amenities = () => (
  <LayoutListing withBackBtn>
    <>
      <Row>
        <Col span={24}>
          <h1 className="text-headline mb-8">
            Select your campers amenities
          </h1>
          <p className="mb-24">
            Not sure about all of the amenities on your campervan or RV?
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't worry, you can edit all of this information later!
          </p>
          <div className="d-flex align-items-center mb-24">
            <img
              src="/images/listing/amenities-svg/accommodation/couch.svg"
              className="mr-12"
              alt=""
            />
            <span className="text-subheader font-700">Accommodation</span>
          </div>
          <Row gutter={24}>
            <Col md={12}>
              <Form.Item>
                <BigCheckboxCounter
                  icon="accommodation/king_bed"
                  text="King Bed"
                  id="King-Bed"
                />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item>
                <BigCheckboxCounter
                  icon="accommodation/queen_bed"
                  text="Queen Bed"
                  id="Queen-Bed"
                />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item>
                <BigCheckboxCounter
                  icon="accommodation/twin_bed"
                  text="Twin Bed"
                  id="Twin-Bed"
                />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item>
                <BigCheckboxCounter
                  icon="accommodation/single_bed"
                  text="Single Bed"
                  id="Single-Bed"
                />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item>
                <BigCheckboxCounter
                  icon="accommodation/dinette_conversion"
                  text="Dinette Conversion"
                  id="Dinette-Conversion"
                />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item>
                <BigCheckboxCounter
                  icon="accommodation/bunk_bed"
                  text="Bunk Bed"
                  id="Bunk-Bed"
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <div className="mb-24 text-subheader font-400">
            Custom accommodation
          </div>
          <Row gutter={24}>
            <Col span={24}>
              <Row gutter={24}>
                <Col lg={12}>
                  <Form.Item>
                    <CustomAccBlock />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={24}>
                <Col lg={12}>
                  <Form.Item>
                    <CustomAccBlock />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Button type="secondary">
            Add custom bed
          </Button>
          <Divider className="mt-24" />
          <div className="d-flex align-items-center mb-24">
            <img
              src="/images/listing/amenities-svg/kitchen/cooking_pot.svg"
              className="mr-12"
              alt=""
            />
            <span className="text-subheader font-700">Kitchen</span>
          </div>
          <Row gutter={24}>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox icon="kitchen/stovetop" text="stovetop" id="stovetop" />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox icon="kitchen/oven" text="oven" id="oven" />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox icon="kitchen/sink" text="sink" id="sink" />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox icon="kitchen/hot-water" text="hot water" id="hot_water" />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox icon="kitchen/microwave" text="microwave" id="microwave" />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox icon="kitchen/fridge" text="fridge" id="fridge" />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox icon="kitchen/freezer" text="freezer" id="freezer" />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox icon="kitchen/cooler" text="cooler" id="cooler" />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox
                  icon="kitchen/extra-countertop-space"
                  text="extra countertop space"
                  id="extra_countertop_space"
                />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <BigCheckbox icon="kitchen/dining-table" text="dining table" id="dining_table" />
            </Col>
          </Row>
          <Divider />
          <div className="d-flex align-items-center mb-24">
            <img
              src="/images/listing/amenities-svg/bathroom/bath.svg"
              className="mr-12"
              alt=""
            />
            <span className="text-subheader font-700">Bathroom</span>
          </div>
          <Row gutter={24}>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox icon="bathroom/outdoor_shower" text="Outdoor Shower" id="outdoor_shower" />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox icon="bathroom/indoor_shower" text="indoor Shower" id="indoor_shower" />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox icon="kitchen/hot-water" text="hot water" id="hot_water" />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox icon="bathroom/toilet_urine_only" text="Toilet (Urine Only)" id="toilet_urine_only" />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox icon="bathroom/toilet_full_use" text="Toilet (Full Use)" id="toilet_full_use" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <div className="d-flex align-items-center mb-24">
            <img
              src="/images/listing/amenities-svg/climate_control/air_conditioning.svg"
              className="mr-12"
              alt=""
            />
            <span className="text-subheader font-700">Climate control</span>
          </div>
          <Row gutter={24}>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox
                  icon="climate_control/ceiling-fan"
                  text="ceiling fan"
                  id="ceiling_fan"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <div className="d-flex align-items-center mb-20">
                  <Switch />
                  <img
                    src="/images/listing/amenities-svg/climate_control/air-conditioner.svg"
                    className="mr-12 ml-12"
                    alt=""
                  />
                  <span>Air Conditioner</span>
                </div>
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox
                  icon="climate_control/hookups_required_for_a_c"
                  text="Hookups Required for A/C"
                  id="hookups_required_for_A/C"
                  tooltipPhrase="Hookups Required for A/C"
                />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox
                  icon="climate_control/off-grid-air-conditioner"
                  text="Off Grid Air Conditioner"
                  id="off_grid_air_conditioner"
                  tooltipPhrase="Hookups Required for A/C"
                />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox
                  icon="climate_control/a-c-only-while-camper-is-on"
                  text="A/C Only While Camper is On"
                  id="a-c-only-while-camper-is-on"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <div className="d-flex align-items-center mb-20">
                  <Switch />
                  <img
                    src="/images/listing/amenities-svg/climate_control/heating.svg"
                    className="mr-12 ml-12"
                    alt=""
                  />
                  <span>Heating</span>
                </div>
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox
                  icon="climate_control/portable-heater"
                  text="Portable Heater"
                  id="portable_heater"
                />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox
                  icon="climate_control/air-heating-system"
                  text="Air Heating System"
                  id="air_heating_system"
                  tooltipPhrase="Hookups Required for A/C"
                />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox
                  icon="climate_control/heating-only-while-camper-is-on"
                  text="Heating Only While Camper is On"
                  id="heating_only_while_camper_is_on"
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <div className="d-flex align-items-center mb-24">
            <img
              src="/images/listing/amenities-svg/power_system/power_system.svg"
              className="mr-12"
              alt=""
            />
            <span className="text-subheader font-700">Power system</span>
          </div>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item>
                <div className="d-flex align-items-center mb-20">
                  <Switch />
                  <img
                    src="/images/listing/amenities-svg/power_system/solar-panels.svg"
                    className="mr-12 ml-12"
                    alt=""
                  />
                  <span>Off Grid Capable System</span>
                </div>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Checkbox className="mb-20">
                  <img
                    src="/images/listing/amenities-svg/power_system/electric-power-system.svg"
                    className="mr-12"
                    alt=""
                  />
                  Electric Power System
                </Checkbox>
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox
                  icon="power_system/battery-storage-under"
                  text="Battery Storage (under 300 amp hours)"
                  id="battery_storage_under"
                />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox
                  icon="power_system/battery-storage-plus"
                  text="Battery Storage (300+ amp hours)"
                  id="battery_storage_up"
                />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox
                  icon="power_system/alternator-charger"
                  text="Alternator Charger"
                  id="alternator_charger"
                  tooltipPhrase="Hookups Required for A/C"
                />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox
                  icon="power_system/inverter"
                  text="inverter"
                  id="inverter"
                  tooltipPhrase="Hookups Required for A/C"
                />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox
                  icon="power_system/electrical-outlets"
                  text="A/C Electrical Outlets"
                  id="electrical_outlets"
                  tooltipPhrase="Hookups Required for A/C"
                />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox
                  icon="power_system/solar-panels"
                  text="Solar Panels"
                  id="solar_panels"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Checkbox className="mb-20">
                  <img
                    src="/images/listing/amenities-svg/power_system/propane-fuel-system.svg"
                    className="mr-12"
                    alt=""
                  />
                  Propane Fuel System
                </Checkbox>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Checkbox className="mb-20">
                  <img
                    src="/images/listing/amenities-svg/power_system/generator.svg"
                    className="mr-12"
                    alt=""
                  />
                  Generator
                </Checkbox>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <div className="d-flex align-items-center mb-20">
                  <Switch />
                  <img
                    src="/images/listing/amenities-svg/power_system/shore-power-hookups.svg"
                    className="mr-12 ml-12"
                    alt=""
                  />
                  <span className="mr-8">Shore Power Hookups</span>
                  <TooltipIcon phrase="some som" iconClass="icon-info-f font-24" />
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <div className="d-flex align-items-center mb-24">
            <img
              src="/images/listing/amenities-svg/bedroom/bed.svg"
              className="mr-12"
              alt=""
            />
            <span className="text-subheader font-700">Bedroom</span>
          </div>
          <Row gutter={24}>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox icon="bedroom/large_mattress" text="Large Mattress" id="large_mattress" />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox icon="bedroom/extra_storage" text="Extra Storage" id="extra_storage" />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox icon="bedroom/blackout_shades" text="Blackout Shades" id="blackout_shades" />
              </Form.Item>
            </Col>
            <Col md={8} lg={6}>
              <Form.Item>
                <BigCheckbox
                  icon="bedroom/sleep_sideways"
                  text="Sleep Sideways"
                  id="sleep_sideways"
                  tooltipPhrase="Hookups Required for A/C"
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <div className="d-flex align-items-center mb-24">
            <img
              src="/images/listing/amenities-svg/entertainment/gamepad.svg"
              className="mr-12"
              alt=""
            />
            <span className="text-subheader font-700">Entertainment</span>
          </div>
          {/* TODO: When <CarCard /> is invisible, remove mb-16 */}
          <div className="mb-16">
            <Row gutter={24}>
              <Col md={8} lg={6}>
                <Form.Item>
                  <BigCheckbox
                    icon="entertainment/upgraded-speaker-system"
                    text="Upgraded Speaker System"
                    id="upgraded_speaker_system"
                  />
                </Form.Item>
              </Col>
              <Col md={8} lg={6}>
                <Form.Item>
                  <BigCheckbox
                    icon="entertainment/bluetooth-speaker"
                    text="Bluetooth Speaker"
                    id="bluetooth_speaker"
                  />
                </Form.Item>
              </Col>
              <Col md={8} lg={6}>
                <Form.Item>
                  <BigCheckbox
                    icon="entertainment/tv"
                    text="TV"
                    id="tv"
                  />
                </Form.Item>
              </Col>
              <Col md={8} lg={6}>
                <Form.Item>
                  <BigCheckbox
                    icon="entertainment/wifi-router"
                    text="Wifi Router"
                    id="wifi_router"
                  />
                </Form.Item>
              </Col>
              <Col md={8} lg={6}>
                <Form.Item>
                  <BigCheckbox
                    icon="entertainment/cell-signal-booster"
                    text="Cell Signal Booster"
                    id="cell_signal_booster"
                    tooltipPhrase="Hookups Required for A/C"
                  />
                </Form.Item>
              </Col>
              <Col md={8} lg={6}>
                <Form.Item>
                  <BigCheckbox
                    icon="entertainment/radio"
                    text="radio"
                    id="radio"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <CarCard isFloat />
    </>
  </LayoutListing>
);

export default Amenities;
