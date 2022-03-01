import {
  Col,
  Form,
  Row,
  Divider,
  Button,
} from 'antd';
import PageLayout from './PageLayout';
import SmallSwitchCard from './components/SmallSwitchCard';
import CustomSmallBlock from './components/CustomSmallBlock';

const RulesAndTravel = () => (
  <PageLayout hasFooter>
    <div className="container">
      <Form layout="vertical">
        <Row>
          <Col span={24}>
            <h1 className="text-headline mb-8">
              Rules
            </h1>
            <p className="mb-24 text-color-gray">
              Define your rules of the road.
            </p>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    addTxt="This is important - can guests bring furry copilots along?"
                    icon="edit_listing/rules/Pets-Allowed"
                    txt="Allow Pets"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    addTxt="Can guests smoke inside your camper?"
                    icon="edit_listing/rules/Smoking-Allowed"
                    txt="Smoking Allowed"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    addTxt="Can guests take your camper to music festivals?"
                    icon="edit_listing/rules/Festival-Approved"
                    txt="Festival Approved"
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
                      Add custom camper rules
                    </div>
                  </Col>
                  <Col span={24}>
                    <CustomSmallBlock inputTitle="Rule name" />
                  </Col>
                  <Col span={24}>
                    <Button type="secondary">
                      Add custom rule
                    </Button>
                  </Col>
                </Row>
              </Col>
            </div>
          </Col>
          <Divider />
          <Col span={24}>
            <Row>
              <Col span={24}>
                <h1 className="text-headline mb-8">
                  Travel restrictions
                </h1>
                <p className="mb-24 text-color-gray">
                  Activate all restrictions that apply to your listing.
                </p>
                <div className="mb-24 text-subtitle">
                  Location
                </div>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    addTxt="Can guests travel to Mexico? (Not typically recommended)"
                    icon="edit_listing/rules/Mexico"
                    txt="Mexico"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    addTxt="Can guests travel to Canada?"
                    icon="edit_listing/rules/Canada"
                    txt="Canada"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    addTxt="Can guests take your vehicle to Burning man festival?"
                    icon="edit_listing/rules/Burning-Man"
                    txt="Burning Man"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Divider />
          <Col lg={16}>
            <div className="mb-40">
              <Col span={24}>
                <Row gutter={24}>
                  <Col span={24}>
                    <div className="mb-24 text-subheader font-400">
                      Custom location
                    </div>
                  </Col>
                  <Col span={24}>
                    <CustomSmallBlock
                      inputTitle="Location name"
                    />
                  </Col>
                  <Col span={24}>
                    <Button type="secondary">
                      Add custom location
                    </Button>
                  </Col>
                </Row>
              </Col>
            </div>
          </Col>
          <Divider />
          <Col span={24}>
            <Row>
              <Col span={24}>
                <div className="mb-24 text-subtitle">
                  Roads
                </div>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    addTxt="Can guests drive down roads that are designated 4x4 (or AWD) only?"
                    icon="edit_listing/rules/4x4-Only-Roads"
                    txt="4x4 Only Roads"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    addTxt="Can guests drive off road to find places to camp?"
                    icon="edit_listing/rules/Off-Road"
                    txt="Off Road"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    addTxt="Can guests drive during winter weather conditions?"
                    icon="edit_listing/rules/Snow-Icy-Road-Conditions"
                    txt="Snow / Icy Road Conditions"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <SmallSwitchCard
                    addTxt="Can guests go down dirt/gravel roads? We highly recommend allowing this."
                    icon="edit_listing/rules/Dirt-Gravel-Roads"
                    txt="Dirt / Gravel Roads"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Divider />
          <Col lg={16}>
            <div className="mb-40">
              <Col span={24}>
                <Row gutter={24}>
                  <Col span={24}>
                    <div className="mb-24 text-subheader font-400">
                      Custom road
                    </div>
                  </Col>
                  <Col span={24}>
                    <CustomSmallBlock
                      inputTitle="Road name"
                    />
                  </Col>
                  <Col span={24}>
                    <Button type="secondary">
                      Add custom road
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

export default RulesAndTravel;
