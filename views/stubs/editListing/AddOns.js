import {
  Col,
  Form,
  Input,
  Row,
  Divider,
  Button,
  Select,
} from 'antd';
import PageLayout from './PageLayout';
import SmallSwitchCard from './components/SmallSwitchCard';
import BigSwitchCard from './components/BigSwitchCard';
import CustomAddBlock from './components/CustomAddBlock';

const { Option } = Select;

const AddOns = () => (
  <PageLayout hasFooter>
    <div className="container">
      <Form layout="vertical">
        <Row>
          <Col lg={16}>
            <h1 className="text-headline mb-8">
              Add-ons
            </h1>
            <p className="mb-24 text-color-gray">
              Select all included add-ons, or add your custom add-ons.
            </p>
            <div className="mb-24 text-subheader font-700">
              Suggested add-ons
            </div>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    icon="edit_listing/add_ons/Bike-Rack"
                    txt="Bike Rack"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    icon="edit_listing/add_ons/Boogie-Board"
                    txt="Boogie Board"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <BigSwitchCard
                    icon="listing/amenities-svg/edit_listing/essentials/Camping-Chairs"
                    txt="Camping Chair"
                  >
                    <>
                      <Form.Item
                        className="flex-grow-1"
                        label={<span className="main-input__label">Description</span>}
                      >
                        <Input />
                      </Form.Item>
                      <div className="d-flex align-items-center flex-wrap w-100 mb-md-8">
                        <Form.Item
                          className="edit-list-switch-card__small-input"
                          label={<span className="main-input__label">Price</span>}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item className="edit-list-switch-card__mid-input">
                          <Select
                            id="fieldID2"
                            name="fieldName"
                            className="main-input__field main-input__field--no-label"
                            optionLabelProp="label"
                            defaultValue="each"
                          >
                            <Option className="p-0" value="each" label="each">
                              <li className="main-dropdown__item">each</li>
                            </Option>
                            <Option className="p-0" value="one" label="one">
                              <li className="main-dropdown__item">one</li>
                            </Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          className="edit-list-switch-card__small-input"
                          label={<span className="main-input__label">Max quantity</span>}
                        >
                          <Input type="number" />
                        </Form.Item>
                      </div>
                    </>
                  </BigSwitchCard>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    icon="edit_listing/add_ons/Cooler"
                    txt="Cooler"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    icon="edit_listing/add_ons/Cornhole"
                    txt="Cornhole"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    icon="edit_listing/add_ons/Daypacks"
                    txt="Daypacks"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    icon="edit_listing/add_ons/Firewood"
                    txt="Firewood"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    icon="edit_listing/add_ons/Hammock"
                    txt="Hammock"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    icon="edit_listing/add_ons/Kayak"
                    txt="Kayak"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    icon="edit_listing/add_ons/Pack-n-Play"
                    txt="Pack n Play"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    icon="edit_listing/add_ons/Paddleboard"
                    txt="Paddleboard"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    icon="edit_listing/add_ons/Portable-Grill"
                    txt="Portable Grill"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    icon="edit_listing/add_ons/Roof-Box"
                    txt="Roof Box"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    icon="edit_listing/add_ons/Surfboard"
                    txt="Surfboard"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    icon="edit_listing/add_ons/Tent"
                    txt="Tent"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    icon="listing/amenities-svg/bathroom/toilet_full_use"
                    txt="Toilet"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Divider />
          <Col span={24}>
            <div className="mb-40">
              <Col lg={16}>
                <Row gutter={24}>
                  <Col span={24}>
                    <div className="mb-24 text-subheader font-400">
                      Custom add-ons
                    </div>
                  </Col>
                  <Col span={24}>
                    <CustomAddBlock />
                  </Col>
                  <Col span={24}>
                    <Button type="secondary">
                      Add custom add-on
                    </Button>
                  </Col>
                </Row>
              </Col>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  </PageLayout>
);

export default AddOns;
