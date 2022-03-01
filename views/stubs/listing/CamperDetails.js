import {
  Col,
  Row,
  Select,
  Input,
  Divider,
  Form,
} from 'antd';
import LocationInput from '../shared/inputs/LocationInpit';
import CarCard from './components/CarCard';
import LayoutListing from './LayoutListing';

const { Option } = Select;

const CamperDetails = () => (
  <LayoutListing>
    <Form layout="vertical">
      <Row gutter={24}>
        <Col lg={16}>
          <h1 className="text-headline mb-8">
            Start with your camper details
          </h1>
          <p className="mb-16">
            This info helps renters make sure the
            campervan or RV is a match. It also gets your camper
            approved for insurance.
          </p>
          <div className="text-subtitle">
            General
          </div>
          <Row gutter={24}>
            <Col span={24}>
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
            </Col>
            <Col md={12}>
              <div className="main-input">
                <Form.Item label={<span className="main-input__label">Make</span>}>
                  <Select
                    id="fieldID"
                    name="fieldName"
                    className="main-input__field"
                    optionLabelProp="label"
                    placeholder="Select make"
                  >
                    <Option className="p-0" value="select1" label="+1">
                      <li className="main-dropdown__item">10`</li>
                    </Option>
                    <Option className="p-0" value="select2" label="+2">
                      <li className="main-dropdown__item">11</li>
                    </Option>
                  </Select>
                </Form.Item>
              </div>
            </Col>
            <Col md={12}>
              <div className="main-input">
                <Form.Item label={<span className="main-input__label">Model</span>}>
                  <Select
                    id="fieldID2"
                    name="fieldName"
                    className="main-input__field"
                    optionLabelProp="label"
                    placeholder="Select model"
                  >
                    <Option className="p-0" value="select1" label="+1">
                      <li className="main-dropdown__item">10`</li>
                    </Option>
                    <Option className="p-0" value="select2" label="+2">
                      <li className="main-dropdown__item">11</li>
                    </Option>
                  </Select>
                </Form.Item>
              </div>
            </Col>
            <Col md={12}>
              <div className="main-input">
                <Form.Item label={<span className="main-input__label">Year</span>}>
                  <Select
                    id="fieldID"
                    name="fieldName"
                    className="main-input__field"
                    optionLabelProp="label"
                    placeholder="Select year"
                  >
                    <Option className="p-0" value="select1" label="+1">
                      <li className="main-dropdown__item">10`</li>
                    </Option>
                    <Option className="p-0" value="select2" label="+2">
                      <li className="main-dropdown__item">11</li>
                    </Option>
                  </Select>
                </Form.Item>
              </div>
            </Col>
            <Col md={12}>
              <div className="main-input">
                <Form.Item
                  label={<span className="main-input__label">Who built your camper? (optional)</span>}
                >
                  <Select
                    id="fieldID2"
                    name="fieldName"
                    className="main-input__field"
                    optionLabelProp="label"
                    placeholder="Select your camper builder"
                  >
                    <Option className="p-0" value="select1" label="+1">
                      <li className="main-dropdown__item">10`</li>
                    </Option>
                    <Option className="p-0" value="select2" label="+2">
                      <li className="main-dropdown__item">11</li>
                    </Option>
                  </Select>
                </Form.Item>
              </div>
            </Col>
            <Col md={12}>
              <div className="main-input">
                <Form.Item label={<span className="main-input__label">Length</span>}>
                  <Select
                    id="fieldID"
                    name="fieldName"
                    className="main-input__field"
                    optionLabelProp="label"
                    placeholder="Select length"
                  >
                    <Option className="p-0" value="select1" label="+1">
                      <li className="main-dropdown__item">10`</li>
                    </Option>
                    <Option className="p-0" value="select2" label="+2">
                      <li className="main-dropdown__item">11</li>
                    </Option>
                    <Option className="p-0" value="select1" label="+380">
                      <li className="main-dropdown__item">12</li>
                    </Option>
                    <Option className="p-0" value="select2" label="+24">
                      <li className="main-dropdown__item">13</li>
                    </Option>
                    <Option className="p-0" value="select1" label="+234">
                      <li className="main-dropdown__item">14</li>
                    </Option>
                    <Option className="p-0" value="select2" label="+345">
                      <li className="main-dropdown__item">15</li>
                    </Option>
                    <Option className="p-0" value="select1" label="+534">
                      <li className="main-dropdown__item">16</li>
                    </Option>
                    <Option className="p-0" value="select2" label="+5467">
                      <li className="main-dropdown__item">17</li>
                    </Option>
                  </Select>
                </Form.Item>
              </div>
            </Col>
            <Col md={12}>
              <div className="main-input">
                <Form.Item label={<span className="main-input__label">Inside height</span>}>
                  <Select
                    id="fieldID2"
                    name="fieldName"
                    className="main-input__field"
                    optionLabelProp="label"
                    placeholder="Select inside height"
                  >
                    <Option value="select1" label="+1">
                      <li className="main-dropdown__item align-items-flex-start">
                        <img className="mr-8" src="/images/listing/High-Top.svg" alt="" />
                        <div>
                          <div className="mb-4 in-black">
                            High Top
                          </div>
                          <p className="text-caption pre-wrap">
                            Inside Standing Height of at least 6’.
                          </p>
                        </div>
                      </li>
                    </Option>
                    <Option value="select2" label="+2">
                      <li className="main-dropdown__item align-items-flex-start">
                        <img className="mr-8" src="/images/listing/Pop-Top.svg" alt="" />
                        <div>
                          <div className="mb-4 in-black">
                            High Top
                          </div>
                          <p className="text-caption pre-wrap">
                            Low Inside Standing Height (under 6’)
                            until the Ceiling is Popped Up.
                          </p>
                        </div>
                      </li>
                    </Option>
                    <Option value="select1" label="+380">
                      <li className="main-dropdown__item align-items-flex-start">
                        <img className="mr-8" src="/images/listing/Low-Top.svg" alt="" />
                        <div>
                          <div className="mb-4 in-black">
                            High Top
                          </div>
                          <p className="text-caption pre-wrap">
                            Low Inside Standing Height (under 6’).
                          </p>
                        </div>
                      </li>
                    </Option>
                    <Option value="select3" label="+380">
                      <li className="main-dropdown__item align-items-flex-start">
                        <img className="mr-8" src="/images/listing/Roof-Top-Tent.svg" alt="" />
                        <div>
                          <div className="mb-4 in-black">
                            Roof Top Tent
                          </div>
                          <p className="text-caption pre-wrap">
                            Typically low top vehicle campers with a roof tent for sleeping.
                          </p>
                        </div>
                      </li>
                    </Option>
                  </Select>
                </Form.Item>
              </div>
            </Col>
            <Col md={12}>
              <div className="mb-20">
                <Form.Item
                  help={(
                    <p className="main-input__message">
                      <i className="main-input__message-icon icon icon-info" />
                      How many people sleep comfortably in your van
                    </p>
                  )}
                  label={<span className="main-input__label">Sleeps</span>}
                >
                  <Input
                    id="Sleeps"
                    className="mb-0"
                    type="text"
                    placeholder="0"
                  />
                </Form.Item>
              </div>
            </Col>
            <Col md={12}>
              <Form.Item
                help={(
                  <p className="main-input__message">
                    <i className="main-input__message-icon icon icon-info" />
                    Number of seats with seatbelts
                  </p>
                )}
                label={<span className="main-input__label">Seats</span>}
              >
                <Input
                  id="Seats"
                  className="mb-0"
                  type="text"
                  placeholder="0"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <LocationInput />
            </Col>
            <Col md={12}>
              <div className="main-input">
                <Form.Item
                  label={<span className="main-input__label">State registered</span>}
                >
                  <Select
                    id="fieldID2"
                    name="fieldName"
                    className="main-input__field"
                    optionLabelProp="label"
                    placeholder="Select state"
                  >
                    <Option className="p-0" value="select1" label="+1">
                      <li className="main-dropdown__item">10`</li>
                    </Option>
                    <Option className="p-0" value="select2" label="+2">
                      <li className="main-dropdown__item">11</li>
                    </Option>
                  </Select>
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Divider />
          <div className="text-subtitle">
            Technical details
          </div>
          <Row gutter={24}>
            <Col md={12}>
              <div className="main-input">
                <Form.Item
                  label={<span className="main-input__label">Transmission</span>}
                >
                  <Select
                    id="fieldID2"
                    name="fieldName"
                    className="main-input__field"
                    optionLabelProp="label"
                    placeholder="Select transmission type"
                  >
                    <Option className="p-0" value="select1" label="+1">
                      <li className="main-dropdown__item">10`</li>
                    </Option>
                    <Option className="p-0" value="select2" label="+2">
                      <li className="main-dropdown__item">11</li>
                    </Option>
                  </Select>
                </Form.Item>
              </div>
            </Col>
            <Col md={12}>
              <div className="main-input-wrap-addtxt">
                <Form.Item
                  label={<span className="main-input__label">Current mileage (estimate)</span>}
                >
                  <Input id="mileage" placeholder="0" />
                  <span className="main-input__add-txt">miles</span>
                </Form.Item>
              </div>
            </Col>
            <Col md={12}>
              <div className="main-input">
                <Form.Item
                  label={<span className="main-input__label">Fuel type</span>}
                >
                  <Select
                    id="fieldID2"
                    name="fieldName"
                    className="main-input__field"
                    optionLabelProp="label"
                    placeholder="Select fuel type"
                  >
                    <Option className="p-0" value="select1" label="+1">
                      <li className="main-dropdown__item">10`</li>
                    </Option>
                    <Option className="p-0" value="select2" label="+2">
                      <li className="main-dropdown__item">11</li>
                    </Option>
                  </Select>
                </Form.Item>
              </div>
            </Col>
            <Col md={12}>
              {/*
                TODO:
                 please add class "main-input--last" only when <CarCard/> appear
                 */}
              <div className="main-input main-input--last">
                <Form.Item
                  label={<span className="main-input__label">Drivetrain</span>}
                >
                  <Select
                    id="fieldID2"
                    name="fieldName"
                    className="main-input__field"
                    optionLabelProp="label"
                    placeholder="Select drivetrain type"
                  >
                    <Option className="p-0" value="select1" label="+1">
                      <li className="main-dropdown__item">10`</li>
                    </Option>
                    <Option className="p-0" value="select2" label="+2">
                      <li className="main-dropdown__item">11</li>
                    </Option>
                  </Select>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={0} lg={8}>
          <CarCard />
        </Col>
      </Row>
    </Form>
  </LayoutListing>
);

export default CamperDetails;
